// Notifier.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// A reusable notification component using Material UI's Snackbar + Alert.
// It stays mounted in your app (usually in App.jsx), but only "shows up"
// when you call `openNotif(...)`.
export default function Notifier() {

    const navigate = useNavigate();

    function handleRoute() {
        if (notif.route !== "") {
            navigate(notif.route);
        }

        if (notif.api !== "") {
            window.open(notif.api, "_blank");
        }
    }

    // Local state for the Snackbar: whether it's open, what message to show,
    // and which severity ("success", "error", "warning", "info").
    const [notif, setNotif] = useState({
        open: false,
        message: "",
        severity: "info",
        route: "",
        api: ""
    });

    // Function to open the Snackbar with a given message + severity.
    // Example: openNotif("Saved successfully!", "success")
    const openNotif = useCallback((message, severity = "info", route = "", api ="") => {
        setNotif({ open: true, message, severity, route, api});
    }, []);

    // Function to close the Snackbar (sets "open" back to false).
    // This gets called automatically after autoHideDuration or
    // when the user clicks the close button (the ❌ on the Alert).
    const closeNotif = useCallback(() => {
        setNotif((prev) => ({ ...prev, open: false }));
    }, []);

    // Expose the `openNotif` function globally on `window`.
    // ⚠️ This is a quick hack so you can call `window.openNotif(...)`
    // anywhere in your app, instead of wiring Context/props.
    // Cleaner solution = React Context, but this works for small apps.
    window.openNotif = openNotif;

    return (
        // Snackbar: the "popup" container from MUI.
        // By default it's hidden (open={false}), but appears when notif.open is true.
        // autoHideDuration=4000 means it disappears after 4 seconds.
        <Snackbar
        open={notif.open}
        autoHideDuration={2000}
        onClose={closeNotif}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClick={handleRoute}
        >
        {/* Alert: styled message inside the Snackbar.
            severity controls the color (success=green, error=red, etc.).
            It also has its own close "X" button, which triggers closeNotif. */}
        <Alert
            severity={notif.severity}
            variant="filled"
            onClose={(e) => { e.stopPropagation(); closeNotif(); }} // prevent the close button click from bubbling and triggering navigation
            sx={{ cursor: notif.route ? "pointer" : "default" }}    // make it obvious it's clickable when a route is present
        >
            {notif.message}
        </Alert>
        </Snackbar>
    );
}
