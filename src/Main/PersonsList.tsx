import * as React from "react";
import { Link } from "react-router-dom";
import { Input } from "../Task/Input";
import { webSocketControllerInstance } from "../WebSocketInstance";
import { Button } from "./Components/Button";
import "./Main.less";
import { IPerson, usePersons } from "./usePersons";

export const PersonsList = () => {
  const persons = usePersons({}, {}, {});

  return (
    <div>
      <Link to={`/person/-1`} className="list__row-wrapper">
        Создать нового сотрудника
      </Link>

      {persons ? (
        persons.map((person, index) => {
          return (
            <div className="list_root" key={index}>
              <Link to={`/person/${person._id}`} className="list__row-wrapper">
                Открыть
              </Link>
              <div className={"listTitle"} key={index}>
                {person.firstName}
              </div>
              <Button
                caption={"X"}
                onClick={() => {
                  webSocketControllerInstance
                    .call({
                      type: "employeeDelete",
                      data: { id: person._id },
                    })
                    .then((data) => {
                      console.log(data);
                    });
                }}
              />
            </div>
          );
        })
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
