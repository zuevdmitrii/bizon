import * as React from "react";
import { PageTemplate } from "./PageTemplate";

export const Helper = () => {
  return (
    <PageTemplate>
      <div className={"listRoot"}>
        <div style={{ margin: "8px" }}>
          <a href={"https://nodejs.org/ru/download/"} target={"_blank"}>
           1. Скачайте и установите node.js
          </a>
        </div>
        <div style={{ margin: "8px" }}>
          <a
            href={"/resources/bison-helper-master.zip"}
            download
            target={"_blank"}
          >
           2. Скачайте помощника
          </a>
        </div>
        <div style={{ margin: "8px" }}>3. Разархивируйте скаченный файл</div>
        <div style={{ margin: "8px" }}>4. Запустите файл start.but</div>
        <div style={{ margin: "8px" }}>5. Пользуйтесь</div>
      </div>
    </PageTemplate>
  );
};
