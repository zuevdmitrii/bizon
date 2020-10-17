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
            <Header />
            <div className={'Bizon__main__content'}>
                <div>{props.children}</div>
            </div>
        </div>
    );
};
