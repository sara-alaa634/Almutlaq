import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../../SharedComponents/Buttons/Button";
import "../../../Assets/Css/CasesManagment.css";
import { errorMessages } from "../../../helpers/messages";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";
import { PulseLoader } from "react-spinners";

// Define all possible permissions
const CreateRole = ({ addRole }) => {
  const { t } = useTranslation();
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [validated, setValidated] = useState(false);
  const [permissionsError, setPermissionsError] = useState(false);
  const [permissonGroup, setPermissionGroup] = useState([]);
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.role.create);
  const hasViewPermission = hasPermission(permissionsNames.role.view);
  useEffect(() => {
    handlePermissions();
  }, []);

  const handlePermissions = () => {
    const PERMISSION_GROUPS = [
      {
        group: t("user management"),
        permissions: [
          { key: "view", value: "View Customer Management" },
          { key: "create", value: "Create Customer Management" },
          { key: "update", value: "Edit Customer Management" },
          { key: "delete", value: "Delete Customer Management" },
        ],
      },
      {
        group: t("Case_Management"),
        permissions: [
          { key: "view", value: "View Case Management" },
          { key: "create", value: "Create Case Management" },
          { key: "update", value: "Edit Case Management" },
          { key: "delete", value: "Delete Case Management" },
        ],
      },
      {
        group: t("Manage messages and conversations"),
        permissions: [
          { key: "view", value: "View Messages and Conversations Management" },
          {
            key: "create",
            value: "Create Messages and Conversations Management",
          },
          {
            key: "update",
            value: "Edit Messages and Conversations Management",
          },
          {
            key: "delete",
            value: "Delete Messages and Conversations Management",
          },
        ],
      },
      {
        group: t("Post Management"),
        permissions: [
          { key: "view", value: "View Posts Management" },
          { key: "create", value: "Create Posts Management" },
          { key: "update", value: "Edit Posts Management" },
          { key: "delete", value: "Delete Posts Management" },
        ],
      },
      {
        group: t("Manage notifications"),
        permissions: [
          { key: "view", value: "View Notifications Management" },
          { key: "create", value: "Create Notifications Management" },
          { key: "update", value: "Edit Notifications Management" },
          { key: "delete", value: "Delete Notifications Management" },
        ],
      },
      {
        group: t("Management About the Office"),
        permissions: [
          { key: "view", value: "View About Office Management" },
          { key: "create", value: "Create About Office Management" },
          { key: "update", value: "Edit About Office Management" },
          { key: "delete", value: "Delete About Office Management" },
        ],
      },
      {
        group: t("Office Services Management"),
        permissions: [
          { key: "view", value: "View Office Services Management" },
          { key: "create", value: "Create Office Services Management" },
          { key: "update", value: "Edit Office Services Management" },
          { key: "delete", value: "Delete Office Services Management" },
        ],
      },
    ];

    // Create Role Management permissions array
    const rolePermissions = [
      hasViewPermission ? { key: "view", value: "View Team Management" } : null,
      hasCreatePermission ? { key: "create", value: "Role Permission" } : null,
    ].filter(Boolean); // Remove null values

    if (rolePermissions.length > 0) {
      PERMISSION_GROUPS.push({
        group: t("Role Management"),
        permissions: rolePermissions,
      });
    }

    setPermissionGroup(PERMISSION_GROUPS);
  };

  const handlePermissionToggle = (permission) => {
    setSelectedPermissions((prevPermissions) => {
      // If permission is already selected, remove it
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((p) => p !== permission);
      }

      // If permission is not selected, add it
      return [...prevPermissions, permission];
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Reset previous validation states
    setValidated(false);
    setPermissionsError(false);

    // Validate role name
    if (!roleName.trim() || selectedPermissions.length === 0) {
      setValidated(true);
      if (selectedPermissions.length === 0) {
        setPermissionsError(true);
      }
      return;
    }

    // Prepare role payload
    const rolePayload = {
      role_name: roleName,
      permissions: selectedPermissions,
    };

    // TODO: Implement API call to create role
    //   console.log("Role Payload:", rolePayload);
    await addRole(rolePayload);
    // Reset form
    setRoleName("");
    setSelectedPermissions([]);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mt-5">
        {/* Role Name Input */}
        <Form.Group
          as={Col}
          md="12"
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          controlId="roleNameInput"
        >
          <Form.Label>{t("job_title")}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder={t("job_title")}
            value={roleName}
            className="text-color2 fw-semibold"
            onChange={(e) => setRoleName(e.target.value)}
            isInvalid={validated && !roleName.trim()}
          />
          <Form.Control.Feedback type="invalid">
            {t("Please_provide_a_valid_name")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Permissions Selection */}
        <Col sm={12} className="my-4">
          <div className="table-responsive-xl">
            <table className="table table-border">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="ms-3 d-inline-block create-btn-clr">
                      {t("Permissions names")}
                    </span>
                  </th>
                  <th scope="col">{t("Permissions")}</th>
                </tr>
              </thead>
              <tbody>
                {permissonGroup.length > 0 ? (
                  permissonGroup.map((group) => (
                    <tr key={group.group}>
                      <td>
                        <span className="ms-3 d-inline-block">
                          {t(group.group)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-4">
                          {group.permissions.map((permission) => (
                            <Form.Check
                              key={permission.value}
                              type="checkbox"
                              id={permission.value}
                              className="mc-1-clr"
                              label={t(permission.key)} // Use the key for UI
                              checked={selectedPermissions.includes(
                                permission.value
                              )} // Use the value for logic
                              onChange={() =>
                                handlePermissionToggle(permission.value)
                              } // Use the value for logic
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">
                      <div className="d-flex align-items-center justify-content-center gap-1">
                        <PulseLoader
                          color="var(--mc-1)"
                          loading={true}
                          size={7}
                          speedMultiplier={0.5} // Decrease this value to slow down the loader
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                        <span className="d-inline-block me-4">
                          {t("loading...")}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {}
          </div>
        </Col>
      </Row>
      {permissionsError && (
        <div className="text-capitalize text-danger fs-6 fw-semibold mb-4">
          {t(errorMessages.emptyPermissionsError)}
        </div>
      )}

      {/* Save Button */}
      <Button
        customClass="btn-h48-s15 btn-lg"
        value={t("save")}
        icon="LuArrowRight"
        buttonType="submit"
        type="button"
        typeAttribute="submit"
      />
    </Form>
  );
};

export default CreateRole;
