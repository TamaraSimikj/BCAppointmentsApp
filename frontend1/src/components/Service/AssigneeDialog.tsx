import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Employee, EmployeesServices, Service } from "../../data/models/Models";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmployeeService from "../../services/employee.service";
import AuthService from "../../services/auth.service";
import { useNotification } from "../../hooks/useNotification";

interface ObjectEmployee {
  employee: Employee;
  checked: Boolean;
}
interface formInterface {
  service: Service;
  employees: ObjectEmployee[];
}

interface AssigneeDialogProps {
  service: Service;
}

const AssigneeDialog: React.FC<AssigneeDialogProps> = ({ service }) => {
  const { showNotification } = useNotification();
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assignedEmployees, setAssignedEmployees] = useState<EmployeesServices[]>([]);

  const [formData, setFormData] = useState<formInterface>({
    service: service,
    employees: [],
  });
  useEffect(() => {
    fetchEmployees();
    fetchEmployeesByServiceId(service.id);
  }, []);

  const assigneEmployeesToService = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    let updateForm = { ...formData };
    employees.map((e) => {
      let checked = assignedEmployees.findIndex((ae) => ae.employee.id == e.id) !== -1;
      let temp = { employee: e, checked: checked };
      updateForm.employees.push(temp);
    });

    setFormData(updateForm);
    setOpenDialog(!openDialog);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, employeeId: number): void => {
    setFormData((prevFormData) => {
      const updatedEmployees = prevFormData.employees.map((e: any) => {
        if (e.employee.id === employeeId) {
          e.checked = event.target.checked;
        }
        return e;
      });

      return { ...prevFormData, employees: updatedEmployees };
    });
  };

  const handleSave = async () => {
    console.log("form Data on save", formData);

    let selectedEmployees = formData.employees.filter((x) => x.checked);
    let list: Employee[] = [];
    selectedEmployees.map((e) => list.push(e.employee)); // moze i so id samo

    console.log("dataReqList", list);
    await EmployeeService.updateEmployeesServices({ service: service, employees: list });
    showNotification("Successfully updated", "success");
    fetchEmployeesByServiceId(service.id);
    setOpenDialog(false);
    setFormData({
      service: service,
      employees: [],
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setFormData({
      service: service,
      employees: [] as any,
    });
  };

  const fetchEmployees = async () => {
    try {
      const loggedEmployee = AuthService.getCurrentUser().employee;
      const employeesData = await EmployeeService.getAllEmployeesForSalon(loggedEmployee.salon.id);
      setEmployees(employeesData);
      // console.log("employeesData", employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const fetchEmployeesByServiceId = async (serviceId: number) => {
    try {
      const employeesData = await EmployeeService.getAllEmployeesForService(serviceId);
      setAssignedEmployees(employeesData);

      // console.log("employeesData assigned", employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  return (
    <>
      <IconButton
        onClick={(event) => {
          assigneEmployeesToService(event);
        }}
      >
        <GroupAddIcon />
      </IconButton>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Asignee Employees to service {service.name}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              {formData.employees.map((e: ObjectEmployee) => (
                <FormControlLabel
                  key={e.employee.id}
                  control={
                    <Checkbox
                      key={e.employee.id}
                      checked={e.checked as boolean}
                      onChange={(event) => handleCheckboxChange(event, e.employee.id)}
                      name={e.employee.name}
                    />
                  }
                  label={e.employee.name}
                />
              ))}
            </FormGroup>
          </FormControl>{" "}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssigneeDialog;
