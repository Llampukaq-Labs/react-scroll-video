"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function ScrollVideo(_a) {
    var { 
    // lower numbers = faster playback
    playback = 500, 
    //initial frame
    frameNumber = 0 } = _a, props = __rest(_a, ["playback", "frameNumber"]);
    const [height, setHeight] = (0, react_1.useState)();
    const [time, setTime] = (0, react_1.useState)();
    const video = (0, react_1.useRef)(null);
    const handleLoadedMetadata = () => {
        var _a;
        if (video.current != undefined) {
            setHeight(`${Math.floor((_a = video.current) === null || _a === void 0 ? void 0 : _a.duration) * playback}px`);
            video.current.currentTime = frameNumber;
        }
    };
    function scrollPlay() {
        var frameNumber = window.pageYOffset / playback;
        if (video.current != undefined) {
            //@ts-ignore
            setTime(frameNumber);
            video.current.currentTime = frameNumber;
            window.requestAnimationFrame(scrollPlay);
        }
    }
    useAnimationFrame(() => {
        scrollPlay();
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { height } }), (0, jsx_runtime_1.jsx)("video", Object.assign({ ref: video, onLoadedMetadata: handleLoadedMetadata, id: "v0", tabIndex: 0, preload: "metadata", style: { position: "fixed", top: 0, left: 0, width: "100%" } }, { children: (0, jsx_runtime_1.jsx)("source", Object.assign({}, props)) }))] }) }));
}
exports.default = ScrollVideo;
const useAnimationFrame = (callback) => {
    const requestRef = (0, react_1.useRef)();
    const previousTimeRef = (0, react_1.useRef)();
    const animate = (time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        //@ts-ignore
        requestRef.current = requestAnimationFrame(animate);
    };
    (0, react_1.useEffect)(() => {
        //@ts-ignore
        requestRef.current = requestAnimationFrame(animate);
        //@ts-ignore
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
};
