import * as React from "react";
import {CSSProperties} from "react";
import keycodes from "../../util/keycodes";

interface SoundProps {
    title: string,
    url: string,
    playKey?: string,
}

interface SoundState {
    title: string,
    url: string,
    isPlaying: boolean,
    key?: string
}

export default class SoundEl extends React.Component<SoundProps, SoundState> {
    private audioEl: HTMLAudioElement = new Audio();
    private style: CSSProperties = {
        height: 75,
        width: 125,
        margin: "0 20 20 0",
        padding: 10,
        borderRadius: 5,
        boxShadow: "0 0.5px 1px 1px #ccc",
        cursor: "pointer",
        overflow: "hidden",
        userSelect: "none"
    };

    constructor(props: SoundProps) {
        super(props);
        this.state = {
            title: props.title,
            url: props.url,
            isPlaying: false,
            key: props.playKey
        }
    }

    bindEventListener = () => {
        //TODO addEventListenerするのはアプリで1回だけ
        //イベントをSoundElまで伝播させて、this.state.keyと比較する
        window.addEventListener("keydown", this.handleKeyDown);
    };

    componentDidMount() {
        this.audioEl.src = this.state.url;
        this.audioEl.addEventListener("ended", this.onend);
        this.bindEventListener();
    }

    componentWillReceiveProps(newProps: SoundProps) {
        window.removeEventListener("keydown", this.handleKeyDown);
        const {title, url, playKey} = newProps;
        this.setState({
            title: title,
            url: url,
            key: playKey
        });
        this.bindEventListener()
    }

    handleKeyDown = (e) => {
        if (!window["isEditName"] && e.keyCode == keycodes[this.state.key]) {
            this.play();
        }
    };

    pause = () => {
        this.audioEl.pause();
        this.audioEl.currentTime = 0;
    };

    onend = () => {
        this.audioEl.currentTime = 0;
        this.setState({
            isPlaying: false
        })
    };

    play = async () => {
        if (this.state.isPlaying === true) {
            this.pause();
        }
        await this.audioEl.play();
        this.setState({
            isPlaying: true
        })
    };

    render() {
        return (
            <div style={this.style} onClick={this.play}>
                <div>{this.state.title}</div>
                <div>{this.state.key}</div>
                <audio
                    preload={""}
                    src={this.state.url}
                    ref={el => {
                        this.audioEl = el;
                    }}/>
            </div>
        )
    }
}