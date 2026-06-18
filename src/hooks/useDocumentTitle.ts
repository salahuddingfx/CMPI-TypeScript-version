import React from "react";
import { Helmet } from "react-helmet-async";

export function useDocumentTitle(title: string) {
  return React.createElement(Helmet, { title });
}
