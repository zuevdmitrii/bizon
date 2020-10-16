import * as React from "react";
import { PageTemplate } from "./PageTemplate";
import { Clipboard } from "./Clipboard/Clipboard";

export const Index = (props: any) => {
  return (
    <PageTemplate>
      <div>
        Test cmp
        <Clipboard />
      </div>
    </PageTemplate>
  );
};
