import * as React from "react";
import { Link } from "react-router-dom";
import "./Main.less";
import { usePersons } from "./usePersons";

export const PersonsList = () => {
  const persons = usePersons({}, {}, {});

  return (
    <div>
      {persons ? (
        persons.map((person, index) => {
          return (
            <div className='list_root' key={index}>
              <Link to={`/person/${person._id}`} className="list__row-wrapper">
                Открыть
              </Link>
              <div className={'listTitle'} key={index}>{person.firstName}</div>
            </div>
          );
        })
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
