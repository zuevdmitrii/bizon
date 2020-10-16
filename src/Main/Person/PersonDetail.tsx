import * as React from "react";
import { PageTemplate } from "../PageTemplate";
import { PersonCart } from "./PersonCard";

export const PersonDetail = (props: any) => {
  return (
    <PageTemplate>
      <PersonCart personId={props.match.params.id} />
    </PageTemplate>
  );
};
