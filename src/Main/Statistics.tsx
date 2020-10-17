import * as React from "react";
import { PageTemplate } from "./PageTemplate";
import { Button } from "./Components/Button";
import "./Statistics.less";

export const Statistics = () => {
  return (
    <PageTemplate>
      <div className={"task-list-title-row"}>
        <span className={"task-list-title"}>Статистика</span>
        <div className={"statistics-btn-wrapper"}>
          <span className={"statistics-btn"}>
            <Button onClick={() => {}} caption={"По дням"} />
          </span>
          <span className={"statistics-btn"}>
            <Button onClick={() => {}} caption={"По неделям"} />
          </span>
          <span className={"statistics-btn"}>
            <Button onClick={() => {}} caption={"По месяцам"} />
          </span>
          <span className={"statistics-btn"}>
            <Button onClick={() => {}} caption={"По годам"} />
          </span>
        </div>
        <div className={"statistics-img-wrapper"}>
          <img width={'100%'} src={"/resources/graphic.jpg"} />
        </div>
      </div>
    </PageTemplate>
  );
};
