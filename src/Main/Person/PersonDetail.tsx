import * as React from "react";
import { PageTemplate } from "../PageTemplate";
import { PersonCard } from "./PersonCard";

export const PersonDetail = (props: any) => {
  return (
    <PageTemplate>
      <PersonCard personId={props.match.params.id} />
    </PageTemplate>
  );
};
