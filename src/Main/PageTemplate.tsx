import * as React from "react";
import {Link} from "react-router-dom";
import {BreadCrumbs} from "./BreadCrumbs";
import {Button} from "./Components/Button";
import {Modal} from "./Components/Modal";
import {Header} from "./Header";

export const PageTemplate = (props: any) => {
    const [modal, setModal] = React.useState(false)
    return (
        <div className={'Bizon__main'}>
            <Header/>
            <div className={'Bizon__main__content'}>
                <div className="menu">
                    <Link to={`/`} className="list__row-wrapper">
                        Главная
                    </Link>
                    <Link to={`/persons/`} className="list__row-wrapper">
                        Сотрудники
                    </Link>
                    <Link to={`/tasks/`} className="list__row-wrapper">
                        Задачи
                    </Link>
                    <Link to={`/task/2`} className="list__row-wrapper">
                        Задача
                    </Link>
                    <Link to={`/person/2`} className="list__row-wrapper">
                        Сотрудник
                    </Link>
                </div>
                <div className="bread">
                    <BreadCrumbs/>
                </div>
                <div>
                    <Button
                        caption='Открыть модалку'
                        onClick={() => {
                            setModal(true)
                        }}/>
                    {modal && <Modal onClose={() => setModal(false)}>
                        <div>
                            Test modal
                            <Button onClick={() => setModal(false)}
                                    caption='Сохранить'/>

                        </div>
                    </Modal>}
                </div>
                <div>{props.children}</div>
            </div>
        </div>
    );
};
