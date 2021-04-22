import React from "react";
import { Formik } from "formik";

function AppForm({ initialvalues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialvalues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
