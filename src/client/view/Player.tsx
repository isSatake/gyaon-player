import * as React from "react"
import GyaonList from "./GyaonList"
import {PageData} from "../../share/data";
import {CSSProperties} from "react";

interface PlayerProps {
    pageList: PageData[]
}

interface PlayerState {
    pageIndex: number
}

export default class Player extends React.Component<PlayerProps, PlayerState> {
    private wrapperStyle: CSSProperties = {
        flex: "3 1 0%",
        height: "100%",
        padding: 16,
        overflow: "auto"
    };
    private headerStyle: CSSProperties = {
        display: "flex"
    };
    private changeButtonStyle: CSSProperties = {
        flex: "1",
        cursor: "pointer",
        userSelect: "none",
        textAlign: "center"
    };

    getDefaultPageIndex = (): number => {
        const defaultTitle = localStorage.getItem("pageTitle");
        if (!defaultTitle) {
            return 0
        }

        const {pageList} = this.props;
        for (let i in pageList) {
            if (pageList[i].title === defaultTitle) {
                return parseInt(i)
            }
        }
    };

    constructor(props: PlayerProps) {
        super(props);
        this.state = {
            pageIndex: this.getDefaultPageIndex()
        }
    }

    changeList = (n) => {
        const {length} = this.props.pageList;
        let newIndex = (this.state.pageIndex + n) % length;
        if (newIndex < 0) {
            newIndex = newIndex + length
        }
        this.setState({
            pageIndex: newIndex
        });
        localStorage.setItem("pageTitle", this.props.pageList[newIndex].title)
    };

    render() {
        const pageData: PageData = this.props.pageList[this.state.pageIndex];
        const {title} = pageData;
        return (
            <div style={this.wrapperStyle}>
                <div style={this.headerStyle}>
                    <div
                        style={this.changeButtonStyle}
                        onClick={e => this.changeList(-1)}>
                        ◀
                    </div>
                    <div style={{flex: "10", width: "100%", textAlign: "center"}}>
                        <a href={`https://scrapbox.io/gyaonlist/${title}`} target="_blank">/gyaonlist/{title}</a>
                    </div>
                    <div
                        style={this.changeButtonStyle}
                        onClick={e => this.changeList(1)}>
                        ▶
                    </div>
                </div>
                <GyaonList
                    list={pageData.sounds}/>
            </div>
        )
    }
}
