import * as React from "react"
import {CSSProperties} from "react"
import {PageData, ReactionMongo} from "../../share/data";
import Player from "./Player";

export type OptionValue = {
    user: string,
    isPlay: boolean,
    isRec: boolean
}

type RootProps = {
    pageList: PageData[]
}

type RootState = {} & OptionValue

export default class Root extends React.Component<RootProps, RootState> {
    constructor(props: RootProps) {
        super(props);
        this.state = {
            user: localStorage.getItem("user") || "名無しさん",
            isPlay: Boolean(localStorage.getItem("isPlay")),
            isRec: Boolean(localStorage.getItem("isRec"))
        }
    }

    onUserChange = (event) => {
        const {value} = event.target;
        localStorage.setItem("user", value);
        this.setState({
            user: value
        });
        event.stopPropagation();
    };

    onIsPlayChange = (event) => {
        const {checked} = event.target;
        localStorage.setItem("isPlay", checked ? "true" : "");
        this.setState({
            isPlay: checked
        })
    };

    onIsRecChange = (event) => {
        const {checked} = event.target;
        localStorage.setItem("isRec", checked ? "true" : "");
        this.setState({
            isRec: checked
        })
    };

    render() {
        const {pageList} = this.props;
        return (
            <Player pageList={pageList}/>
        )
    }
}
