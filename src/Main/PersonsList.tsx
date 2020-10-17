import * as React from "react";
import { Link } from "react-router-dom";
import { Input } from "../Task/Input";
import { webSocketControllerInstance } from "../WebSocketInstance";
import { Button } from "./Components/Button";
import { ModalDialog } from "./Components/modalDialog/ModalDialog";
import "./Main.less";
import { IPerson, usePersons } from "./usePersons";

export const PersonsList = () => {
  const persons = usePersons({}, {}, {});
  const [modal, setModal] = React.useState(false)
  return (
    <div>
      <Button onClick={()=>setModal(true)}/>
      <Link to={`/person/-1`} className="list__row-wrapper">
        Создать нового сотрудника
      </Link>

      <ModalDialog 
      show={modal} content={()=>{return <>AAAAAAAA</>}}/>
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
