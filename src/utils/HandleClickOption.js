import { useState} from "react";

export default function handleClick(props){

    const handleClick = (props) => {

        setTab(props.opcion)

        if (props.opcion === 'home') {
            if (selected0 === 1) {
                setSelected0(0);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected0(1);
            }
        }
        else if (props.opcion === 'cajeros') {
            if (selected === 1) {
                setSelected(0);
                setSelected0(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected(1);
            }
        } else if (props.opcion === 'boxes') {
            if (selected2 === 1) {
                setSelected2(0);
                setSelected0(1);
                setSelected(1);
                setSelected3(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected2(1);
            }
        } else if (props.opcion === 'tipos') {
            if (selected3 === 1) {
                setSelected3(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected4(1);
                setSelected5(1);
            } else {
                setSelected3(1);
            }
        }
        else if (props.opcion === 'reportes') {
            if (selected4 === 1) {
                setSelected4(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected5(1);
            } else {
                setSelected4(1);
            }
        } else {
            if (selected5 === 1) {
                setSelected5(0);
                setSelected0(1);
                setSelected(1);
                setSelected2(1);
                setSelected3(1);
                setSelected4(1);
            } else {
                setSelected5(1);
            }
        }
    };
}