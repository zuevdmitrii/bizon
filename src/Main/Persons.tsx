import * as React from "react";
import { PageTemplate } from "./PageTemplate";
import { PersonsList } from "./PersonsList";

export const Persons = () => {
  return <PageTemplate>
      <PersonsList />
  </PageTemplate>
};
