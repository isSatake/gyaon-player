import * as React from "react"
import * as ReactDOM from "react-dom"
import Root from "./view/Root"
import {PageData, ReactionMongo} from "../share/data"

interface AppProps {
    pageList: PageData[]
}

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Root pageList={this.props.pageList}/>
        )
    }
}

window.onload = () => {
    //expressから送信したJSONがwindowに格納されている
    ReactDOM.render(<App pageList={window["pageList"]}/>, document.getElementById("container"))
};