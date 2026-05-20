import {r as a} from "./index.ed373d49.js";
var d = {
    exports: {}
}
  , K = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h = a
  , V = Symbol.for("react.element")
  , u = Symbol.for("react.fragment")
  , m = Object.prototype.hasOwnProperty
  , g = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Z = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function W(M, S, A) {
    var R, I = {}, L = null, O = null;
    A !== void 0 && (L = "" + A),
    S.key !== void 0 && (L = "" + S.key),
    S.ref !== void 0 && (O = S.ref);
    for (R in S)
        m.call(S, R) && !Z.hasOwnProperty(R) && (I[R] = S[R]);
    if (M && M.defaultProps)
        for (R in S = M.defaultProps,
        S)
            I[R] === void 0 && (I[R] = S[R]);
    return {
        $$typeof: V,
        type: M,
        key: L,
        ref: O,
        props: I,
        _owner: g.current
    }
}
K.Fragment = u;
K.jsx = W;
K.jsxs = W;
d.exports = K;
var E = d.exports;
let p = class extends a.Component {
    constructor(S) {
        super(S),
        this.state = {
            animationState: "empty",
            showResult: !1,
            showGameOverLetters: !1
        },
        this.onAnimationEnd = this.onAnimationEnd.bind(this)
    }
    onAnimationEnd(S) {
        let A, R, I;
        return S.animationName === "PopIn" && (R = "empty",
        A = !1,
        I = !1),
        S.animationName === "FlipIn" && (R = "flip-out",
        A = !0,
        I = !1),
        S.animationName === "FlipOut" && (R = "empty",
        A = !0,
        I = !1),
        S.animationName === "FlipGameOverBegin" && (R = "flip-game-over-end",
        A = !0,
        I = !0),
        S.animationName === "FlipGameOverEnd" && (R = "empty",
        A = !0,
        I = !0),
        S.animationName === "Bounce" && (R = "empty",
        A = !0,
        I = !1),
        this.setState({
            animationState: R,
            showResult: A,
            showGameOverLetters: I
        })
    }
    componentDidUpdate(S, A, R) {
        const I = !S.shouldRevealLetter && this.props.shouldRevealLetter
          , L = !S.isSyncingFromLocalStorage && this.props.isSyncingFromLocalStorage;
        if (I || L)
            return this.setState({
                animationState: "flip-in"
            });
        const O = A.animationState === "flip-out" && this.state.animationState === "empty"
          , T = this.props.isSyncingFromLocalStorage;
        if (O)
            return T ? this.props.handleFinishSyncingFromLocalStorage() : this.props.incrementAnimationIndex();
        const N = S.column
          , t = S.guess.word[N]
          , U = this.props.guess.word[N];
        if (!t && U)
            return this.setState({
                animationState: "pop"
            });
        const s = !S.displayGameOverLetters
          , Y = this.props.displayGameOverLetters;
        if (s && Y)
            return this.setState({
                animationState: "flip-game-over-begin"
            });
        const e = A.animationState === "flip-game-over-end"
          , H = this.state.animationState === "empty";
        if (e && H)
            return this.props.handleFinishGameOverAnimation()
    }
    render() {
        let S = this.props.guess
          , A = this.props.column;
        const R = S.word[A]
          , I = S.submitted
          , L = I && S.wordResults[A] === "MISS"
          , O = I && S.wordResults[A] === "HIT"
          , T = I && S.wordResults[A] === "PARTIAL"
          , N = this.props.isSurvivalTile
          , t = this.state.showGameOverLetters
          , U = S.rowIsDisqualified;
        let s = "letter-box";
        return this.state.showResult && (t && (s += " letter-box-death"),
        L && (s += " letter-box-miss"),
        O && (s += " letter-box-success"),
        T && (s += " letter-box-partial-success"),
        N && (s += " letter-box-win")),
        U && (s += " letter-box-disqualified"),
        E.jsx("div", {
            className: s,
            "data-animation": this.state.animationState,
            onAnimationEnd: this.onAnimationEnd,
            children: R
        }, A)
    }
}
;
class x extends a.Component {
    constructor() {
        super(),
        this.state = {
            animatingLetterIndex: 0,
            displayGameOverLetters: !1
        },
        this.incrementAnimationIndex = this.incrementAnimationIndex.bind(this),
        this.handleFinishGameOverAnimation = this.handleFinishGameOverAnimation.bind(this),
        this.viewRemainingWordsAfterRow = this.viewRemainingWordsAfterRow.bind(this)
    }
    componentDidUpdate(S) {
        if (S.guess.submitted && !this.props.guess.submitted)
            return this.setState({
                animatingLetterIndex: 0
            })
    }
    handleFinishGameOverAnimation() {
        this.props.handleWordFinishedAnimating(this.props.currentWordIndex)
    }
    incrementAnimationIndex() {
        const S = this.state.animatingLetterIndex + 1;
        return S === 5 ? this.props.handleWordFinishedAnimating(this.props.currentWordIndex) : this.setState({
            animatingLetterIndex: S
        })
    }
    viewRemainingWordsAfterRow(S) {
        let A = this.props.guess
          , R = this.props.gameResult;
        (R === "WORDLE" || R === "ELIMINATED" || R === "SURVIVED") && A.numberOfValidWordsRemaining && A.numberOfValidWordsRemaining <= 25 && A.numberOfValidWordsRemaining !== 0 && this.props.showCheatModal(S)
    }
    render() {
        let S = [0, 1, 2, 3, 4]
          , A = this.props.guess
          , R = this.props.gameResult
          , I = A.isProcessing
          , L = this.props.isSyncingFromLocalStorage
          , O = this.state.animatingLetterIndex
          , T = this.props.currentWordIndex
          , N = R === "SURVIVED" && T === 5
          , t = R === "WORDLE" || R === "ELIMINATED" || R === "SURVIVED"
          , U = "valid-words-remaining-count-at-row";
        return t && A.numberOfValidWordsRemaining && A.numberOfValidWordsRemaining <= 25 && A.numberOfValidWordsRemaining !== 0 && (U += " show-link-to-words-remaining"),
        E.jsxs("div", {
            className: "letter-row",
            children: [S.map(s => {
                const Y = I && O === s;
                return E.jsx(p, {
                    guess: A,
                    column: s,
                    shouldRevealLetter: Y,
                    isSyncingFromLocalStorage: L,
                    incrementAnimationIndex: this.incrementAnimationIndex,
                    handleFinishSyncingFromLocalStorage: this.props.handleFinishSyncingFromLocalStorage.bind(null, T, s),
                    isSurvivalTile: N,
                    displayGameOverLetters: this.state.displayGameOverLetters,
                    handleFinishGameOverAnimation: this.handleFinishGameOverAnimation
                }, s)
            }
            ), !L && (A.numberOfValidWordsRemaining || A.numberOfValidWordsRemaining === 0) && E.jsx("div", {
                className: U,
                onClick: this.viewRemainingWordsAfterRow.bind(this, T),
                children: A.numberOfValidWordsRemaining
            })]
        })
    }
}
let w = class extends a.Component {
    constructor(S) {
        super(S)
    }
    render() {
        let S = [0, 1, 2, 3, 4, 5]
          , A = this.props.guesses;
        return E.jsx("div", {
            id: "game-board",
            children: S.map(R => {
                const I = A[R];
                return E.jsx(x, {
                    guess: I,
                    currentWordIndex: R,
                    handleWordFinishedAnimating: this.props.handleWordFinishedAnimating,
                    handleFinishSyncingFromLocalStorage: this.props.handleFinishSyncingFromLocalStorage,
                    isSyncingFromLocalStorage: this.props.isSyncingFromLocalStorage,
                    gameResult: this.props.gameResult,
                    showCheatModal: this.props.showCheatModal
                }, R)
            }
            )
        })
    }
}
;
function f(M) {
    const {currentWordIndex: S, handleOnScreenKeyBoardClick: A, keyboardStatus: R, undoWord: I, undosRemaining: L, undoHistory: O, gameResult: T, showUndoHistoryModal: N, selectRandomStartingWord: t} = M
      , U = T === "TEMPORARILY ELIMINATED"
      , s = S === 0 && O && O.length === 0
      , Y = T === "WORDLE" || T === "ELIMINATED" || T === "SURVIVED"
      , e = function(C) {
        let i = "keyboard-button";
        const l = R[C] === "HIT"
          , o = R[C] === "PARTIAL"
          , G = R[C] === "MISS";
        return U ? i += " keyboard-button-miss" : (l && (i += " keyboard-button-success"),
        o && (i += " keyboard-button-partial-success"),
        G && (i += " keyboard-button-miss")),
        i
    }
      , H = function() {
        let C = "keyboard-button";
        return U && (C += " keyboard-button-miss"),
        C
    }
      , n = function() {
        let C = "keyboard-button";
        return U && (C += " keyboard-button-miss"),
        C
    }
      , D = function() {
        let C = "keyboard-button";
        return L === 0 && (C += " keyboard-button-miss"),
        C
    }
      , P = function() {
        let C = "keyboard-button";
        return (O.length === 0 || U) && (C += " keyboard-button-miss"),
        C
    };
    return !Y && E.jsxs("div", {
        id: "keyboard-cont",
        children: [E.jsx("div", {
            className: "special-buttons",
            children: s ? E.jsx("button", {
                className: "keyboard-button",
                id: "random-starting-word",
                onClick: t,
                children: "Random Starting Word"
            }) : [E.jsx("button", {
                className: P(),
                id: "show-undo-results",
                onClick: N,
                children: "View Prior Undos"
            }), E.jsx("button", {
                className: D(),
                id: "undo-button",
                onClick: I,
                children: "Undo Prior Word"
            })]
        }), E.jsxs("div", {
            className: "first-row",
            children: [E.jsx("button", {
                className: e("Q"),
                onClick: A,
                children: "q"
            }), E.jsx("button", {
                className: e("W"),
                onClick: A,
                children: "w"
            }), E.jsx("button", {
                className: e("E"),
                onClick: A,
                children: "e"
            }), E.jsx("button", {
                className: e("R"),
                onClick: A,
                children: "r"
            }), E.jsx("button", {
                className: e("T"),
                onClick: A,
                children: "t"
            }), E.jsx("button", {
                className: e("Y"),
                onClick: A,
                children: "y"
            }), E.jsx("button", {
                className: e("U"),
                onClick: A,
                children: "u"
            }), E.jsx("button", {
                className: e("I"),
                onClick: A,
                children: "i"
            }), E.jsx("button", {
                className: e("O"),
                onClick: A,
                children: "o"
            }), E.jsx("button", {
                className: e("P"),
                onClick: A,
                children: "p"
            })]
        }), E.jsxs("div", {
            className: "second-row",
            children: [E.jsx("button", {
                className: e("A"),
                onClick: A,
                children: "a"
            }), E.jsx("button", {
                className: e("S"),
                onClick: A,
                children: "s"
            }), E.jsx("button", {
                className: e("D"),
                onClick: A,
                children: "d"
            }), E.jsx("button", {
                className: e("F"),
                onClick: A,
                children: "f"
            }), E.jsx("button", {
                className: e("G"),
                onClick: A,
                children: "g"
            }), E.jsx("button", {
                className: e("H"),
                onClick: A,
                children: "h"
            }), E.jsx("button", {
                className: e("J"),
                onClick: A,
                children: "j"
            }), E.jsx("button", {
                className: e("K"),
                onClick: A,
                children: "k"
            }), E.jsx("button", {
                className: e("L"),
                onClick: A,
                children: "l"
            })]
        }), E.jsxs("div", {
            className: "third-row",
            children: [E.jsx("button", {
                className: H(),
                onClick: A,
                children: "Enter"
            }), E.jsx("button", {
                className: e("Z"),
                onClick: A,
                children: "z"
            }), E.jsx("button", {
                className: e("X"),
                onClick: A,
                children: "x"
            }), E.jsx("button", {
                className: e("C"),
                onClick: A,
                children: "c"
            }), E.jsx("button", {
                className: e("V"),
                onClick: A,
                children: "v"
            }), E.jsx("button", {
                className: e("B"),
                onClick: A,
                children: "b"
            }), E.jsx("button", {
                className: e("N"),
                onClick: A,
                children: "n"
            }), E.jsx("button", {
                className: e("M"),
                onClick: A,
                children: "m"
            }), E.jsx("button", {
                className: n(),
                onClick: C => {
                    A(C, "DEL")
                }
                ,
                children: E.jsx("svg", {
                    className: "delete-icon",
                    xmlns: "http://www.w3.org/2000/svg",
                    height: "24",
                    viewBox: "0 0 24 24",
                    width: "24",
                    children: E.jsx("path", {
                        fill: "black",
                        d: "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                    })
                })
            })]
        })]
    })
}
function v(M) {
    return E.jsxs("header", {
        children: [E.jsx("div", {
            className: "menu-left"
        }), E.jsxs("div", {
            className: "menu-right",
            children: [E.jsx("button", {
                onClick: M.showInfoModal,
                id: "help-button",
                className: "icon",
                tabIndex: "-1",
                children: E.jsx("game-icon", {
                    icon: "help",
                    children: E.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 0 24 24",
                        width: "24",
                        children: E.jsx("path", {
                            fill: "black",
                            d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                        })
                    })
                })
            }), E.jsx("button", {
                onClick: M.showStatisticsModal,
                id: "statistics-button",
                className: "icon",
                tabIndex: "-1",
                children: E.jsx("game-icon", {
                    icon: "statistics",
                    children: E.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 0 24 24",
                        width: "24",
                        children: E.jsx("path", {
                            fill: "black",
                            d: "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
                        })
                    })
                })
            })]
        })]
    })
}
class J extends a.Component {
    render() {
        const S = this.props.showModal ? "visible" : "hidden"
          , A = {
            HIT: "valid-word-remaining-result-letter valid-letter-box-success",
            PARTIAL: "valid-word-remaining-result-letter valid-letter-box-partial-success",
            MISS: "valid-word-remaining-result-letter valid-letter-box-miss"
        }
          , R = JSON.parse(JSON.stringify(this.props.validWords));
        return R.sort( (I, L) => I.word < L.word ? -1 : I.word > L.word ? 1 : 0),
        E.jsx("div", {
            className: "overlay CheatModal",
            "modal-state": S,
            children: E.jsxs("div", {
                className: "content",
                children: [E.jsx("div", {
                    className: "close-icon",
                    children: E.jsx("game-icon", {
                        icon: "close",
                        onClick: this.props.closeModal,
                        children: E.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            height: "24",
                            viewBox: "0 0 24 24",
                            width: "24",
                            children: E.jsx("path", {
                                fill: "var(--color-tone-1)",
                                d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            })
                        })
                    })
                }), E.jsx("p", {
                    style: {
                        textAlign: "center"
                    },
                    children: "Valid Words Remaining"
                }), E.jsx("ol", {
                    children: R.map( (I, L) => {
                        const O = I.wordResults.map( (T, N) => E.jsx("div", {
                            className: A[T],
                            children: I.word[N]
                        }, N));
                        return E.jsx("li", {
                            className: "valid-word-remaining-list",
                            children: E.jsx("div", {
                                className: "valid-word-remaining-result",
                                children: O
                            })
                        }, L)
                    }
                    )
                })]
            })
        })
    }
}
function F(M, S, A, R, I) {
    let L = `Don't Wordle ${A}`;
    L += R === "WORDLE" ? ` - WORDLED
I must admit that I Wordled!` : R === "ELIMINATED" ? ` - ELIMINATED
Well technically I didn't Wordle!` : R === "SURVIVED" ? ` - SURVIVED
Hooray! I didn't Wordle today!` : "";
    for (var T = 0; T < M.length; T++) {
        L += `
`;
        const s = M[T]
          , Y = s.wordResults.length === 0 ? ["ELIMINATED", "ELIMINATED", "ELIMINATED", "ELIMINATED", "ELIMINATED"] : s.wordResults;
        for (var N = 0; N < Y.length; N++) {
            const H = Y[N];
            H === "HIT" ? L += "🟩" : H === "PARTIAL" ? L += "🟨" : H === "MISS" ? L += "⬜" : H === "ELIMINATED" && (L += "⬛")
        }
        const e = s.numberOfValidWordsRemaining;
        (e || e === 0) && (L += e)
    }
    const t = I.length;
    if (L += `
Undos used: ${t}`,
    R === "SURVIVED") {
        const {unusedLetterCount: s} = S
          , Y = M[5].numberOfValidWordsRemaining;
        L += `

  ${Y} words remaining`,
        L += `
x ${s} unused letters`,
        L += `
= ${Y * s} total score`
    }
    return L
}
function c(M) {
    var S = document.createElement("textarea");
    if (S.value = M,
    S.setAttribute("readonly", ""),
    S.style = {
        position: "absolute",
        left: "-9999px"
    },
    document.body.appendChild(S),
    navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        var A = S.contentEditable
          , R = S.readOnly;
        S.contentEditable = !0,
        S.readOnly = !0;
        var I = document.createRange();
        I.selectNodeContents(S);
        var L = window.getSelection();
        L.removeAllRanges(),
        L.addRange(I),
        S.setSelectionRange(0, 999999),
        S.contentEditable = A,
        S.readOnly = R
    } else
        S.select();
    document.execCommand("copy"),
    document.body.removeChild(S)
}
class X extends a.Component {
    constructor() {
        super(),
        this.state = {
            hasSharedScore: !1,
            timeLeftInDay: this.getTimeLeftInDay()
        },
        this.copyShareableScore = this.copyShareableScore.bind(this),
        this.getTimeLeftInDay = this.getTimeLeftInDay.bind(this),
        this.setTimeLeftInDay = this.setTimeLeftInDay.bind(this)
    }
    componentDidMount() {
        setInterval(this.setTimeLeftInDay, 1e3)
    }
    componentDidUpdate(S) {
        S.showModal && !this.props.showModal && this.setState({
            hasSharedScore: !1
        })
    }
    getTimeLeftInDay() {
        const S = new Date;
        let R = (new Date().setHours(24, 0, 0, 0) - S) / 1e3;
        const I = Math.floor(R / 3600);
        R -= I * 3600;
        const L = Math.floor(R / 60);
        R -= L * 60,
        R = Math.floor(R);
        const O = I < 10 ? `0${I}` : `${I}`
          , T = L < 10 ? `0${L}` : `${L}`
          , N = R < 10 ? `0${R}` : `${R}`;
        return `${O}:${T}:${N}`
    }
    setTimeLeftInDay() {
        const S = this.getTimeLeftInDay();
        this.setState({
            timeLeftInDay: S
        })
    }
    copyShareableScore() {
        const {guesses: S, finalScoreStats: A, gameResult: R, puzzleNumber: I, undoHistory: L} = this.props
          , O = F(S, A, I, R, L);
        c(O),
        this.setState({
            hasSharedScore: !0
        })
    }
    render() {
        const S = this.props.showModal ? "visible" : "hidden"
          , A = this.props.gameResult
          , R = this.getTimeLeftInDay()
          , I = JSON.parse(window.localStorage.getItem("gameStats")) || {
            currentWinStreak: 0,
            maxStreak: 0,
            totalPlayed: 0,
            totalWordles: 0,
            totalSurvivals: 0,
            totalEliminations: 0,
            lastPuzzlePlayed: null
        }
          , {currentWinStreak: L, maxStreak: O, totalSurvivals: T, totalEliminations: N, totalWordles: t, totalPlayed: U} = I
          , s = Math.max(T, N, t)
          , Y = Math.round(T / U * 100) || 0
          , e = A === "WORDLE" || A === "ELIMINATED" || A === "SURVIVED";
        return E.jsx("div", {
            className: "overlay GameOverModal",
            "modal-state": S,
            children: E.jsxs("div", {
                className: "content",
                children: [E.jsx("div", {
                    className: "close-icon",
                    children: E.jsx("game-icon", {
                        icon: "close",
                        onClick: this.props.closeModal,
                        children: E.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            height: "24",
                            viewBox: "0 0 24 24",
                            width: "24",
                            children: E.jsx("path", {
                                fill: "var(--color-tone-1)",
                                d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            })
                        })
                    })
                }), E.jsxs("div", {
                    className: "container",
                    children: [E.jsx("p", {
                        children: "Statistics"
                    }), E.jsxs("div", {
                        id: "statistics1",
                        children: [E.jsxs("div", {
                            className: "statistic-container",
                            children: [E.jsx("div", {
                                className: "statistic",
                                children: U
                            }), E.jsx("div", {
                                className: "label",
                                children: "Played"
                            })]
                        }), E.jsxs("div", {
                            className: "statistic-container",
                            children: [E.jsx("div", {
                                className: "statistic",
                                children: Y
                            }), E.jsx("div", {
                                className: "label",
                                children: "Win %"
                            })]
                        }), E.jsxs("div", {
                            className: "statistic-container",
                            children: [E.jsx("div", {
                                className: "statistic",
                                children: L
                            }), E.jsx("div", {
                                className: "label",
                                children: "Current Streak"
                            })]
                        }), E.jsxs("div", {
                            className: "statistic-container",
                            children: [E.jsx("div", {
                                className: "statistic",
                                children: O
                            }), E.jsx("div", {
                                className: "label",
                                children: "Max Streak"
                            })]
                        })]
                    }), E.jsx("p", {
                        children: "Guess Distribution"
                    }), E.jsxs("div", {
                        id: "guess-distribution",
                        children: [E.jsxs("div", {
                            className: "graph-container",
                            children: [E.jsx("div", {
                                className: "guess",
                                children: "Survived"
                            }), E.jsx("div", {
                                className: "graph",
                                children: E.jsx("div", {
                                    className: T === 0 ? "graph-bar" : A === "SURVIVED" ? "graph-bar align-right highlight" : "graph-bar align-right",
                                    style: {
                                        width: `${Math.max(T / s * 100, 7) || 7}%`
                                    },
                                    children: E.jsx("div", {
                                        className: "num-guesses",
                                        children: T
                                    })
                                })
                            })]
                        }), E.jsxs("div", {
                            className: "graph-container",
                            children: [E.jsx("div", {
                                className: "guess",
                                children: "Eliminated"
                            }), E.jsx("div", {
                                className: "graph",
                                children: E.jsx("div", {
                                    className: N === 0 ? "graph-bar" : A === "ELIMINATED" ? "graph-bar align-right highlight" : "graph-bar align-right",
                                    style: {
                                        width: `${Math.max(N / s * 100, 7) || 7}%`
                                    },
                                    children: E.jsx("div", {
                                        className: "num-guesses",
                                        children: N
                                    })
                                })
                            })]
                        }), E.jsxs("div", {
                            className: "graph-container",
                            children: [E.jsx("div", {
                                className: "guess",
                                children: "Wordled"
                            }), E.jsx("div", {
                                className: "graph",
                                children: E.jsx("div", {
                                    className: t === 0 ? "graph-bar" : A === "WORDLE" ? "graph-bar align-right highlight" : "graph-bar align-right",
                                    style: {
                                        width: `${Math.max(t / s * 100, 7) || 7}%`
                                    },
                                    children: E.jsx("div", {
                                        className: "num-guesses",
                                        children: t
                                    })
                                })
                            })]
                        })]
                    }), e && E.jsxs("div", {
                        className: "footer",
                        children: [E.jsxs("div", {
                            className: "countdown",
                            children: [E.jsx("h1", {
                                children: "Next Game"
                            }), E.jsx("div", {
                                id: "timer",
                                children: E.jsx("div", {
                                    className: "statistic-container",
                                    children: E.jsx("div", {
                                        className: "statistic timer",
                                        children: E.jsx("countdown-timer", {
                                            children: E.jsx("div", {
                                                id: "timer",
                                                children: R
                                            })
                                        })
                                    })
                                })
                            })]
                        }), E.jsx("div", {
                            className: "share",
                            children: E.jsxs("button", {
                                id: "share-button",
                                onClick: this.copyShareableScore,
                                children: [this.state.hasSharedScore ? "Copied!" : "Share", !this.state.hasSharedScore && E.jsx("game-icon", {
                                    icon: "share",
                                    children: E.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        height: "24",
                                        viewBox: "0 0 24 24",
                                        width: "24",
                                        children: E.jsx("path", {
                                            fill: "white",
                                            d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                                        })
                                    })
                                })]
                            })
                        })]
                    })]
                })]
            })
        })
    }
}
class b extends a.Component {
    render() {
        const S = this.props.showModal ? "visible" : "hidden";
        return E.jsx("div", {
            className: "overlay InfoModal",
            "modal-state": S,
            children: E.jsxs("div", {
                className: "content",
                children: [E.jsx("div", {
                    className: "close-icon",
                    children: E.jsx("game-icon", {
                        icon: "close",
                        onClick: this.props.closeModal,
                        children: E.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            height: "24",
                            viewBox: "0 0 24 24",
                            width: "24",
                            children: E.jsx("path", {
                                fill: "var(--color-tone-1)",
                                d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            })
                        })
                    })
                }), E.jsx("p", {
                    style: {
                        textAlign: "center",
                        "margin-bottom": "5px"
                    },
                    children: E.jsx("strong", {
                        children: "HOW TO PLAY"
                    })
                }), E.jsx("p", {
                    children: "Don't Wordle is just like Wordle but the opposite. The objective of this game is to avoid guessing the hidden word within 6 attempts, while adhering to certain game rules."
                }), E.jsxs("div", {
                    style: {
                        "margin-top": "10px"
                    },
                    children: [E.jsx("p", {
                        style: {
                            textAlign: "center",
                            "margin-bottom": "5px"
                        },
                        children: E.jsx("strong", {
                            children: "EXAMPLE"
                        })
                    }), E.jsxs("div", {
                        class: "letter-row",
                        children: [E.jsx("div", {
                            class: "letter-box letter-box-success",
                            "data-animation": "empty",
                            children: "A"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "L"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "E"
                        })]
                    }), E.jsxs("p", {
                        children: ["- ", E.jsx("strong", {
                            children: "A"
                        }), " is in the word and in the correct spot."]
                    }), E.jsxs("p", {
                        children: ["- After correctly placing a letter, subsequent guesses ", E.jsx("strong", {
                            children: "must maintain"
                        }), " that letter in the same position."]
                    }), E.jsxs("div", {
                        class: "letter-row",
                        style: {
                            "margin-top": "15px"
                        },
                        children: [E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "A"
                        }), E.jsx("div", {
                            class: "letter-box letter-box-partial-success",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "L"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "E"
                        })]
                    }), E.jsxs("p", {
                        children: ["- ", E.jsx("strong", {
                            children: "P"
                        }), " is in the word but in the wrong spot."]
                    }), E.jsxs("p", {
                        children: ["- If you correctly guess a letter but in the wrong position, subsequent guesses ", E.jsx("strong", {
                            children: "must relocate"
                        }), " that letter."]
                    }), E.jsxs("div", {
                        class: "letter-row",
                        style: {
                            "margin-top": "15px"
                        },
                        children: [E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "A"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "P"
                        }), E.jsx("div", {
                            class: "letter-box letter-box-miss",
                            "data-animation": "empty",
                            children: "L"
                        }), E.jsx("div", {
                            class: "letter-box ",
                            "data-animation": "empty",
                            children: "E"
                        })]
                    }), E.jsxs("p", {
                        children: ["- ", E.jsx("strong", {
                            children: "L"
                        }), " is not in the word in any spot."]
                    }), E.jsxs("p", {
                        children: ["- Once letters are guessed and ruled out, they are ", E.jsx("strong", {
                            children: "no longer available"
                        }), " for use."]
                    })]
                }), E.jsxs("div", {
                    style: {
                        "margin-top": "10px"
                    },
                    children: [E.jsx("p", {
                        style: {
                            textAlign: "center",
                            "margin-bottom": "5px"
                        },
                        children: E.jsx("strong", {
                            children: "TIPS"
                        })
                    }), E.jsx("p", {
                        children: "The current number of available guesses and UNDOs will be displayed above. If the remaining guesses become too few, utilize the UNDO function."
                    })]
                })]
            })
        })
    }
}
class y extends a.Component {
    render() {
        const S = this.props.showModal ? "visible" : "hidden"
          , A = {
            HIT: "undo-word-result-letter undo-letter-box-success",
            PARTIAL: "undo-word-result-letter undo-letter-box-partial-success",
            MISS: "undo-word-result-letter undo-letter-box-miss"
        };
        return E.jsx("div", {
            className: "overlay UndoHistoryModal",
            "modal-state": S,
            children: E.jsxs("div", {
                className: "content",
                children: [E.jsx("div", {
                    className: "close-icon",
                    children: E.jsx("game-icon", {
                        icon: "close",
                        onClick: this.props.closeModal,
                        children: E.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            height: "24",
                            viewBox: "0 0 24 24",
                            width: "24",
                            children: E.jsx("path", {
                                fill: "var(--color-tone-1)",
                                d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            })
                        })
                    })
                }), E.jsx("p", {
                    style: {
                        textAlign: "center"
                    },
                    children: "Undos Used"
                }), E.jsx("ol", {
                    children: this.props.undoHistory.map( (R, I) => {
                        const L = R.wordResults.map( (O, T) => E.jsx("div", {
                            className: A[O],
                            children: R.word[T]
                        }, T));
                        return E.jsx("li", {
                            className: "undo-word-list",
                            children: E.jsx("div", {
                                className: "undo-word-result",
                                children: L
                            })
                        }, I)
                    }
                    )
                })]
            })
        })
    }
}
class j extends a.Component {
    render() {
        const S = this.props.showModal ? "visible" : "hidden";
        this.props.gameResult;
        const A = this.props.disableToggleHardMode;
        return E.jsx("div", {
            className: "settings-overlay",
            "modal-state": S,
            children: E.jsxs("div", {
                className: "settings-overlay-content",
                children: [E.jsx("div", {
                    className: "close-icon",
                    children: E.jsx("game-icon", {
                        icon: "close",
                        onClick: this.props.closeModal,
                        children: E.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            height: "24",
                            viewBox: "0 0 24 24",
                            width: "24",
                            children: E.jsx("path", {
                                fill: "var(--color-tone-1)",
                                d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            })
                        })
                    })
                }), E.jsx("p", {
                    style: {
                        textAlign: "center"
                    },
                    children: "Settings"
                }), E.jsx("div", {
                    className: "sections",
                    children: E.jsx("section", {
                        children: E.jsxs("div", {
                            className: "setting",
                            children: [E.jsxs("div", {
                                className: "text",
                                children: [E.jsx("div", {
                                    className: "title",
                                    children: "Hard Mode"
                                }), E.jsx("div", {
                                    className: "description",
                                    children: "Limited to only two UNDOs per round"
                                })]
                            }), E.jsx("div", {
                                className: "control",
                                children: E.jsx("game-switch", {
                                    id: "hard-mode",
                                    name: "hard-mode",
                                    checked: this.props.hardModeEnabled,
                                    disabled: A,
                                    children: E.jsxs("div", {
                                        className: "container",
                                        children: [E.jsx("label", {
                                            children: E.jsx("slot", {})
                                        }), E.jsx("div", {
                                            className: "switch",
                                            onClick: this.props.toggleHardMode,
                                            children: E.jsx("span", {
                                                className: "knob"
                                            })
                                        })]
                                    })
                                })
                            })]
                        })
                    })
                })]
            })
        })
    }
}
class Q extends a.Component {
    constructor() {
        super(),
        this.state = {
            hasSharedScore: !1
        },
        this.copyShareableScore = this.copyShareableScore.bind(this)
    }
    copyShareableScore() {
        const {guesses: S, finalScoreStats: A, gameResult: R, puzzleNumber: I, undoHistory: L} = this.props
          , O = F(S, A, I, R, L)
          , T = this;
        c(O),
        this.setState({
            hasSharedScore: !0
        }, function() {
            setTimeout(function() {
                T.setState({
                    hasSharedScore: !1
                })
            }, 3e3)
        })
    }
    render() {
        const S = this.props.gameResult
          , A = S === "WORDLE" || S === "ELIMINATED" || S === "SURVIVED"
          , R = E.jsx("div", {
            children: "Oh no! You accidentally Wordled!"
        })
          , I = [E.jsx("div", {
            children: "Oh no! You have been eliminated!"
        }), E.jsx("div", {
            children: "You don't have enough words left to use!"
        }), E.jsx("div", {
            children: `Today's word was ${this.props.targetWord}.`
        })]
          , L = [E.jsx("div", {
            children: "Well done! You managed not to Wordle!"
        }), E.jsx("div", {
            children: `Today's word was ${this.props.targetWord}.`
        })]
          , O = S === "SURVIVED" ? L : S === "WORDLE" ? R : S === "ELIMINATED" ? I : null;
        return A && E.jsxs("div", {
            className: "game-over-section",
            children: [E.jsx("div", {
                className: "game-over-message",
                children: O
            }), E.jsxs("div", {
                className: "share-button-container",
                children: [E.jsx("div", {
                    children: E.jsxs("button", {
                        id: "stats-button-home-page",
                        onClick: this.props.showStatisticsModal,
                        children: ["Stats", E.jsx("game-icon", {
                            icon: "share",
                            children: E.jsx("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                height: "24",
                                viewBox: "0 0 24 24",
                                width: "24",
                                children: E.jsx("path", {
                                    fill: "white",
                                    d: "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
                                })
                            })
                        })]
                    })
                }), E.jsx("div", {
                    children: E.jsxs("button", {
                        id: "share-button-home-page",
                        onClick: this.copyShareableScore,
                        children: [this.state.hasSharedScore ? "Copied!" : "Share", !this.state.hasSharedScore && E.jsx("game-icon", {
                            icon: "share",
                            children: E.jsx("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                height: "24",
                                viewBox: "0 0 24 24",
                                width: "24",
                                children: E.jsx("path", {
                                    fill: "white",
                                    d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                                })
                            })
                        })]
                    })
                })]
            })]
        })
    }
}
class k extends a.Component {
    constructor() {
        super(),
        this.state = {
            showToast: !1,
            toastState: "empty"
        },
        this.resetToastState = this.resetToastState.bind(this)
    }
    componentDidUpdate(S, A) {
        !S.errorMessage && this.props.errorMessage && (this.setState({
            showToast: !0
        }),
        setTimeout( () => {
            this.setState({
                toastState: "fade"
            })
        }
        , 0)),
        S.errorMessage && !this.props.errorMessage && this.setState({
            showToast: !1,
            toastState: "empty"
        }),
        S.gameResult === "IN PROGRESS" && this.props.gameResult === "TEMPORARILY ELIMINATED" && (this.setState({
            showToast: !0
        }),
        setTimeout( () => {
            this.setState({
                toastState: "fade"
            })
        }
        , 100)),
        S.gameResult === "TEMPORARILY ELIMINATED" && this.props.gameResult === "IN PROGRESS" && this.setState({
            showToast: !1,
            toastState: "empty"
        })
    }
    resetToastState() {
        this.setState({
            showToast: !1,
            toastState: "empty"
        })
    }
    render() {
        const S = this.state.showToast
          , A = this.state.toastState === "fade" ? "toast fade" : "toast"
          , R = this.props.errorMessage
          , I = this.props.validWordsRemaining.length
          , L = this.props.guesses.length - this.props.currentWordIndex
          , O = `There ${I === 1 ? "is" : "are"} only ${I} valid word${I === 1 ? "" : "s"} remaining but you have ${L} guess${L === 1 ? "" : "es"} to go. You must use one of your Undos.`
          , T = this.props.gameResult === "TEMPORARILY ELIMINATED" ? O : this.props.errorMessage ? R : null
          , N = this.props.gameResult === "TEMPORARILY ELIMINATED" ? "tempeliminated" : this.props.errorMessage ? "error" : null;
        return E.jsx("div", {
            className: "toaster",
            id: "game-toaster",
            onTransitionEnd: this.resetToastState,
            children: S && E.jsx("game-toast", {
                children: E.jsx("div", {
                    className: A,
                    toastpurpose: N,
                    children: T
                })
            })
        })
    }
}
const r = ["AAHED", "AALII", "AARGH", "AARTI", "ABACA", "ABACI", "ABACS", "ABAFT", "ABAKA", "ABAMP", "ABAND", "ABASH", "ABASK", "ABAYA", "ABBAS", "ABBED", "ABBES", "ABCEE", "ABEAM", "ABEAR", "ABELE", "ABERS", "ABETS", "ABIES", "ABLER", "ABLES", "ABLET", "ABLOW", "ABMHO", "ABOHM", "ABOIL", "ABOMA", "ABOON", "ABORD", "ABORE", "ABRAM", "ABRAY", "ABRIM", "ABRIN", "ABRIS", "ABSEY", "ABSIT", "ABUNA", "ABUNE", "ABUTS", "ABUZZ", "ABYES", "ABYSM", "ACAIS", "ACARI", "ACCAS", "ACCOY", "ACERB", "ACERS", "ACETA", "ACHAR", "ACHED", "ACHES", "ACHOO", "ACIDS", "ACIDY", "ACING", "ACINI", "ACKEE", "ACKER", "ACMES", "ACMIC", "ACNED", "ACNES", "ACOCK", "ACOLD", "ACRED", "ACRES", "ACROS", "ACTED", "ACTIN", "ACTON", "ACYLS", "ADAWS", "ADAYS", "ADBOT", "ADDAX", "ADDED", "ADDER", "ADDIO", "ADDLE", "ADEEM", "ADHAN", "ADIEU", "ADIOS", "ADITS", "ADMAN", "ADMEN", "ADMIX", "ADOBO", "ADOWN", "ADOZE", "ADRAD", "ADRED", "ADSUM", "ADUKI", "ADUNC", "ADUST", "ADVEW", "ADYTA", "ADZED", "ADZES", "AECIA", "AEDES", "AEGIS", "AEONS", "AERIE", "AEROS", "AESIR", "AFALD", "AFARA", "AFARS", "AFEAR", "AFLAJ", "AFORE", "AFRIT", "AFROS", "AGAMA", "AGAMI", "AGARS", "AGAST", "AGAVE", "AGAZE", "AGENE", "AGERS", "AGGER", "AGGIE", "AGGRI", "AGGRO", "AGGRY", "AGHAS", "AGILA", "AGIOS", "AGISM", "AGIST", "AGITA", "AGLEE", "AGLET", "AGLEY", "AGLOO", "AGLUS", "AGMAS", "AGOGE", "AGONE", "AGONS", "AGOOD", "AGORA", "AGRIA", "AGRIN", "AGROS", "AGUED", "AGUES", "AGUNA", "AGUTI", "AHEAP", "AHENT", "AHIGH", "AHIND", "AHING", "AHINT", "AHOLD", "AHULL", "AHURU", "AIDAS", "AIDED", "AIDES", "AIDOI", "AIDOS", "AIERY", "AIGAS", "AIGHT", "AILED", "AIMED", "AIMER", "AINEE", "AINGA", "AIOLI", "AIRED", "AIRER", "AIRNS", "AIRTH", "AIRTS", "AITCH", "AITUS", "AIVER", "AIYEE", "AIZLE", "AJIES", "AJIVA", "AJUGA", "AJWAN", "AKEES", "AKELA", "AKENE", "AKING", "AKITA", "AKKAS", "ALAAP", "ALACK", "ALAMO", "ALAND", "ALANE", "ALANG", "ALANS", "ALANT", "ALAPA", "ALAPS", "ALARY", "ALATE", "ALAYS", "ALBAS", "ALBEE", "ALCID", "ALCOS", "ALDEA", "ALDER", "ALDOL", "ALECK", "ALECS", "ALEFS", "ALEFT", "ALEPH", "ALEWS", "ALEYE", "ALFAS", "ALGAL", "ALGAS", "ALGID", "ALGIN", "ALGOR", "ALGUM", "ALIAS", "ALIFS", "ALINE", "ALIST", "ALIYA", "ALKIE", "ALKOS", "ALKYD", "ALKYL", "ALLEE", "ALLEL", "ALLIS", "ALLOD", "ALLYL", "ALMAH", "ALMAS", "ALMEH", "ALMES", "ALMUD", "ALMUG", "ALODS", "ALOED", "ALOES", "ALOHA", "ALOIN", "ALOOS", "ALOWE", "ALTHO", "ALTOS", "ALULA", "ALUMS", "ALURE", "ALVAR", "ALWAY", "AMAHS", "AMAIN", "AMATE", "AMAUT", "AMBAN", "AMBIT", "AMBOS", "AMBRY", "AMEBA", "AMEER", "AMENE", "AMENS", "AMENT", "AMIAS", "AMICE", "AMICI", "AMIDE", "AMIDO", "AMIDS", "AMIES", "AMIGA", "AMIGO", "AMINE", "AMINO", "AMINS", "AMIRS", "AMLAS", "AMMAN", "AMMON", "AMMOS", "AMNIA", "AMNIC", "AMNIO", "AMOKS", "AMOLE", "AMORT", "AMOUR", "AMOVE", "AMOWT", "AMPED", "AMPUL", "AMRIT", "AMUCK", "AMYLS", "ANANA", "ANATA", "ANCHO", "ANCLE", "ANCON", "ANDRO", "ANEAR", "ANELE", "ANENT", "ANGAS", "ANGLO", "ANIGH", "ANILE", "ANILS", "ANIMA", "ANIMI", "ANION", "ANISE", "ANKER", "ANKHS", "ANKUS", "ANLAS", "ANNAL", "ANNAS", "ANNAT", "ANOAS", "ANOLE", "ANOMY", "ANSAE", "ANTAE", "ANTAR", "ANTAS", "ANTED", "ANTES", "ANTIS", "ANTRA", "ANTRE", "ANTSY", "ANURA", "ANYON", "APACE", "APAGE", "APAID", "APAYD", "APAYS", "APEAK", "APEEK", "APERS", "APERT", "APERY", "APGAR", "APHIS", "APIAN", "APIOL", "APISH", "APISM", "APODE", "APODS", "APOOP", "APORT", "APPAL", "APPAY", "APPEL", "APPRO", "APPUI", "APPUY", "APRES", "APSES", "APSIS", "APSOS", "APTED", "APTER", "AQUAE", "AQUAS", "ARABA", "ARAKS", "ARAME", "ARARS", "ARBAS", "ARCED", "ARCHI", "ARCOS", "ARCUS", "ARDEB", "ARDRI", "AREAD", "AREAE", "AREAL", "AREAR", "AREAS", "ARECA", "AREDD", "AREDE", "AREFY", "AREIC", "ARENE", "AREPA", "ARERE", "ARETE", "ARETS", "ARETT", "ARGAL", "ARGAN", "ARGIL", "ARGLE", "ARGOL", "ARGON", "ARGOT", "ARGUS", "ARHAT", "ARIAS", "ARIEL", "ARIKI", "ARILS", "ARIOT", "ARISH", "ARKED", "ARLED", "ARLES", "ARMED", "ARMER", "ARMET", "ARMIL", "ARNAS", "ARNUT", "AROBA", "AROHA", "AROID", "ARPAS", "ARPEN", "ARRAH", "ARRAS", "ARRET", "ARRIS", "ARROZ", "ARSED", "ARSES", "ARSEY", "ARSIS", "ARTAL", "ARTEL", "ARTIC", "ARTIS", "ARUHE", "ARUMS", "ARVAL", "ARVEE", "ARVOS", "ARYLS", "ASANA", "ASCON", "ASCUS", "ASDIC", "ASHED", "ASHES", "ASHET", "ASKED", "ASKER", "ASKOI", "ASKOS", "ASPEN", "ASPER", "ASPIC", "ASPIE", "ASPIS", "ASPRO", "ASSAI", "ASSAM", "ASSES", "ASSEZ", "ASSOT", "ASTER", "ASTIR", "ASTUN", "ASURA", "ASWAY", "ASWIM", "ASYLA", "ATAPS", "ATAXY", "ATIGI", "ATILT", "ATIMY", "ATLAS", "ATMAN", "ATMAS", "ATMOS", "ATOCS", "ATOKE", "ATOKS", "ATOMS", "ATOMY", "ATONY", "ATOPY", "ATRIA", "ATRIP", "ATTAP", "ATTAR", "ATUAS", "AUDAD", "AUGER", "AUGHT", "AULAS", "AULIC", "AULOI", "AULOS", "AUMIL", "AUNES", "AUNTS", "AURAE", "AURAL", "AURAR", "AURAS", "AUREI", "AURES", "AURIC", "AURIS", "AURUM", "AUTOS", "AUXIN", "AVALE", "AVANT", "AVAST", "AVELS", "AVENS", "AVERS", "AVGAS", "AVINE", "AVION", "AVISE", "AVISO", "AVIZE", "AVOWS", "AVYZE", "AWARN", "AWATO", "AWAVE", "AWAYS", "AWDLS", "AWEEL", "AWETO", "AWING", "AWMRY", "AWNED", "AWNER", "AWOLS", "AWORK", "AXELS", "AXILE", "AXILS", "AXING", "AXITE", "AXLED", "AXLES", "AXMAN", "AXMEN", "AXOID", "AXONE", "AXONS", "AYAHS", "AYAYA", "AYELP", "AYGRE", "AYINS", "AYONT", "AYRES", "AYRIE", "AZANS", "AZIDE", "AZIDO", "AZINE", "AZLON", "AZOIC", "AZOLE", "AZONS", "AZOTE", "AZOTH", "AZUKI", "AZURN", "AZURY", "AZYGY", "AZYME", "AZYMS", "BAAED", "BAALS", "BABAS", "BABEL", "BABES", "BABKA", "BABOO", "BABUL", "BABUS", "BACCA", "BACCO", "BACCY", "BACHA", "BACHS", "BACKS", "BADDY", "BAELS", "BAFFS", "BAFFY", "BAFTS", "BAGHS", "BAGIE", "BAHTS", "BAHUS", "BAHUT", "BAILS", "BAIRN", "BAISA", "BAITH", "BAITS", "BAIZA", "BAIZE", "BAJAN", "BAJRA", "BAJRI", "BAJUS", "BAKED", "BAKEN", "BAKES", "BAKRA", "BALAS", "BALDS", "BALDY", "BALED", "BALES", "BALKS", "BALKY", "BALLS", "BALLY", "BALMS", "BALOO", "BALSA", "BALTI", "BALUN", "BALUS", "BAMBI", "BANAK", "BANCO", "BANCS", "BANDA", "BANDH", "BANDS", "BANDY", "BANED", "BANES", "BANGS", "BANIA", "BANKS", "BANNS", "BANTS", "BANTU", "BANTY", "BANYA", "BAPUS", "BARBE", "BARBS", "BARBY", "BARCA", "BARDE", "BARDO", "BARDS", "BARDY", "BARED", "BARER", "BARES", "BARFI", "BARFS", "BARIC", "BARKS", "BARKY", "BARMS", "BARMY", "BARNS", "BARNY", "BARPS", "BARRA", "BARRE", "BARRO", "BARRY", "BARYE", "BASAN", "BASED", "BASEN", "BASER", "BASES", "BASHO", "BASIJ", "BASKS", "BASON", "BASSE", "BASSI", "BASSO", "BASSY", "BASTA", "BASTI", "BASTO", "BASTS", "BATED", "BATES", "BATHS", "BATIK", "BATTA", "BATTS", "BATTU", "BAUDS", "BAUKS", "BAULK", "BAURS", "BAVIN", "BAWDS", "BAWKS", "BAWLS", "BAWNS", "BAWRS", "BAWTY", "BAYED", "BAYER", "BAYES", "BAYLE", "BAYTS", "BAZAR", "BAZOO", "BEADS", "BEAKS", "BEAKY", "BEALS", "BEAMS", "BEAMY", "BEANO", "BEANS", "BEANY", "BEARE", "BEARS", "BEATH", "BEATS", "BEATY", "BEAUS", "BEAUT", "BEAUX", "BEBOP", "BECAP", "BECKE", "BECKS", "BEDAD", "BEDEL", "BEDES", "BEDEW", "BEDIM", "BEDYE", "BEEDI", "BEEFS", "BEEPS", "BEERS", "BEERY", "BEETS", "BEFOG", "BEGAD", "BEGAR", "BEGEM", "BEGOT", "BEGUM", "BEIGE", "BEIGY", "BEINS", "BEKAH", "BELAH", "BELAR", "BELAY", "BELEE", "BELGA", "BELLS", "BELON", "BELTS", "BEMAD", "BEMAS", "BEMIX", "BEMUD", "BENDS", "BENDY", "BENES", "BENET", "BENGA", "BENIS", "BENNE", "BENNI", "BENNY", "BENTO", "BENTS", "BENTY", "BEPAT", "BERAY", "BERES", "BERGS", "BERKO", "BERKS", "BERME", "BERMS", "BEROB", "BERYL", "BESAT", "BESAW", "BESEE", "BESES", "BESIT", "BESOM", "BESOT", "BESTI", "BESTS", "BETAS", "BETED", "BETES", "BETHS", "BETID", "BETON", "BETTA", "BETTY", "BEVER", "BEVOR", "BEVUE", "BEVVY", "BEWET", "BEWIG", "BEZES", "BEZIL", "BEZZY", "BHAIS", "BHAJI", "BHANG", "BHATS", "BHELS", "BHOOT", "BHUNA", "BHUTS", "BIACH", "BIALI", "BIALY", "BIBBS", "BIBES", "BICCY", "BICES", "BIDED", "BIDER", "BIDES", "BIDET", "BIDIS", "BIDON", "BIELD", "BIERS", "BIFFO", "BIFFS", "BIFFY", "BIFID", "BIGAE", "BIGGS", "BIGGY", "BIGHA", "BIGHT", "BIGLY", "BIGOS", "BIJOU", "BIKED", "BIKER", "BIKES", "BIKIE", "BILBO", "BILBY", "BILED", "BILES", "BILGY", "BILKS", "BILLS", "BIMAH", "BIMAS", "BIMBO", "BINAL", "BINDI", "BINDS", "BINER", "BINES", "BINGS", "BINGY", "BINIT", "BINKS", "BINTS", "BIOGS", "BIONT", "BIOTA", "BIPED", "BIPOD", "BIRDS", "BIRKS", "BIRLE", "BIRLS", "BIROS", "BIRRS", "BIRSE", "BIRSY", "BISES", "BISKS", "BISOM", "BITCH", "BITER", "BITES", "BITOS", "BITOU", "BITSY", "BITTE", "BITTS", "BIVIA", "BIVVY", "BIZES", "BIZZO", "BIZZY", "BLABS", "BLADS", "BLADY", "BLAER", "BLAES", "BLAFF", "BLAGS", "BLAHS", "BLAIN", "BLAMS", "BLART", "BLASE", "BLASH", "BLATE", "BLATS", "BLATT", "BLAUD", "BLAWN", "BLAWS", "BLAYS", "BLEAR", "BLEBS", "BLECH", "BLEES", "BLENT", "BLERT", "BLEST", "BLETS", "BLEYS", "BLIMY", "BLING", "BLINI", "BLINS", "BLINY", "BLIPS", "BLIST", "BLITE", "BLITS", "BLIVE", "BLOBS", "BLOCS", "BLOGS", "BLOOK", "BLOOP", "BLORE", "BLOTS", "BLOWS", "BLOWY", "BLUBS", "BLUDE", "BLUDS", "BLUDY", "BLUED", "BLUES", "BLUET", "BLUEY", "BLUID", "BLUME", "BLUNK", "BLURS", "BLYPE", "BOABS", "BOAKS", "BOARS", "BOART", "BOATS", "BOBAC", "BOBAK", "BOBAS", "BOBOL", "BOBOS", "BOCCA", "BOCCE", "BOCCI", "BOCHE", "BOCKS", "BODED", "BODES", "BODGE", "BODHI", "BODLE", "BOEPS", "BOETS", "BOEUF", "BOFFO", "BOFFS", "BOGAN", "BOGEY", "BOGGY", "BOGIE", "BOGLE", "BOGUE", "BOGUS", "BOHEA", "BOHOS", "BOILS", "BOING", "BOINK", "BOITE", "BOKED", "BOKEH", "BOKES", "BOKOS", "BOLAR", "BOLAS", "BOLDS", "BOLES", "BOLIX", "BOLLS", "BOLOS", "BOLTS", "BOLUS", "BOMAS", "BOMBE", "BOMBO", "BOMBS", "BONCE", "BONDS", "BONED", "BONER", "BONES", "BONGS", "BONIE", "BONKS", "BONNE", "BONNY", "BONZA", "BONZE", "BOOAI", "BOOAY", "BOOBS", "BOODY", "BOOED", "BOOFY", "BOOGY", "BOOHS", "BOOKS", "BOOKY", "BOOLS", "BOOMS", "BOOMY", "BOONG", "BOONS", "BOORD", "BOORS", "BOOSE", "BOOTS", "BOPPY", "BORAK", "BORAL", "BORAS", "BORDE", "BORDS", "BORED", "BOREE", "BOREL", "BORER", "BORES", "BORGO", "BORIC", "BORKS", "BORMS", "BORNA", "BORON", "BORTS", "BORTY", "BORTZ", "BOSIE", "BOSKS", "BOSKY", "BOSON", "BOSUN", "BOTAS", "BOTEL", "BOTES", "BOTHY", "BOTTE", "BOTTS", "BOTTY", "BOUGE", "BOUKS", "BOULT", "BOUNS", "BOURD", "BOURG", "BOURN", "BOUSE", "BOUSY", "BOUTS", "BOVID", "BOWAT", "BOWED", "BOWER", "BOWES", "BOWET", "BOWIE", "BOWLS", "BOWNE", "BOWRS", "BOWSE", "BOXED", "BOXEN", "BOXES", "BOXLA", "BOXTY", "BOYAR", "BOYAU", "BOYED", "BOYFS", "BOYGS", "BOYLA", "BOYOS", "BOYSY", "BOZOS", "BRAAI", "BRACH", "BRACK", "BRACT", "BRADS", "BRAES", "BRAGS", "BRAIL", "BRAKS", "BRAKY", "BRAME", "BRANE", "BRANK", "BRANS", "BRANT", "BRAST", "BRATS", "BRAVA", "BRAVI", "BRAWS", "BRAXY", "BRAYS", "BRAZA", "BRAZE", "BREAM", "BREDE", "BREDS", "BREEM", "BREER", "BREES", "BREID", "BREIS", "BREME", "BRENS", "BRENT", "BRERE", "BRERS", "BREVE", "BREWS", "BREYS", "BRIER", "BRIES", "BRIGS", "BRIKI", "BRIKS", "BRILL", "BRIMS", "BRINS", "BRIOS", "BRISE", "BRISS", "BRITH", "BRITS", "BRITT", "BRIZE", "BROCH", "BROCK", "BRODS", "BROGH", "BROGS", "BROME", "BROMO", "BRONC", "BROND", "BROOL", "BROOS", "BROSE", "BROSY", "BROWS", "BRUGH", "BRUIN", "BRUIT", "BRULE", "BRUME", "BRUNG", "BRUSK", "BRUST", "BRUTS", "BUATS", "BUAZE", "BUBAL", "BUBAS", "BUBBA", "BUBBE", "BUBBY", "BUBUS", "BUCHU", "BUCKO", "BUCKS", "BUCKU", "BUDAS", "BUDIS", "BUDOS", "BUFFA", "BUFFE", "BUFFI", "BUFFO", "BUFFS", "BUFFY", "BUFOS", "BUFTY", "BUHLS", "BUHRS", "BUIKS", "BUIST", "BUKES", "BULBS", "BULGY", "BULKS", "BULLA", "BULLS", "BULSE", "BUMBO", "BUMFS", "BUMPH", "BUMPS", "BUMPY", "BUNAS", "BUNCE", "BUNCO", "BUNDE", "BUNDH", "BUNDS", "BUNDT", "BUNDU", "BUNDY", "BUNGS", "BUNGY", "BUNIA", "BUNJE", "BUNJY", "BUNKO", "BUNKS", "BUNNS", "BUNTS", "BUNTY", "BUNYA", "BUOYS", "BUPPY", "BURAN", "BURAS", "BURBS", "BURDS", "BURET", "BURFI", "BURGH", "BURGS", "BURIN", "BURKA", "BURKE", "BURKS", "BURLS", "BURNS", "BUROO", "BURPS", "BURQA", "BURRO", "BURRS", "BURRY", "BURSA", "BURSE", "BUSBY", "BUSES", "BUSKS", "BUSKY", "BUSSU", "BUSTI", "BUSTS", "BUSTY", "BUTEO", "BUTES", "BUTLE", "BUTOH", "BUTTS", "BUTTY", "BUTUT", "BUTYL", "BUZZY", "BWANA", "BWAZI", "BYDED", "BYDES", "BYKED", "BYKES", "BYRES", "BYRLS", "BYSSI", "BYTES", "BYWAY", "CAAED", "CABAS", "CABER", "CABOB", "CABOC", "CABRE", "CACAS", "CACKS", "CACKY", "CADEE", "CADES", "CADGE", "CADGY", "CADIE", "CADIS", "CADRE", "CAECA", "CAESE", "CAFES", "CAFFS", "CAGED", "CAGER", "CAGES", "CAGOT", "CAHOW", "CAIDS", "CAINS", "CAIRD", "CAJON", "CAJUN", "CAKED", "CAKES", "CAKEY", "CALFS", "CALID", "CALIF", "CALIX", "CALKS", "CALLA", "CALLS", "CALMS", "CALMY", "CALOS", "CALPA", "CALPS", "CALVE", "CALYX", "CAMAN", "CAMAS", "CAMES", "CAMIS", "CAMOS", "CAMPI", "CAMPO", "CAMPS", "CAMPY", "CAMUS", "CANED", "CANEH", "CANER", "CANES", "CANGS", "CANID", "CANNA", "CANNS", "CANSO", "CANST", "CANTO", "CANTS", "CANTY", "CAPAS", "CAPED", "CAPES", "CAPEX", "CAPHS", "CAPIZ", "CAPLE", "CAPON", "CAPOS", "CAPOT", "CAPRI", "CAPUL", "CARAP", "CARBO", "CARBS", "CARBY", "CARDI", "CARDS", "CARDY", "CARED", "CARER", "CARES", "CARET", "CAREX", "CARKS", "CARLE", "CARLS", "CARNS", "CARNY", "CAROB", "CAROM", "CARON", "CARPI", "CARPS", "CARRS", "CARSE", "CARTA", "CARTE", "CARTS", "CARVY", "CASAS", "CASCO", "CASED", "CASES", "CASKS", "CASKY", "CASTS", "CASUS", "CATES", "CAUDA", "CAUKS", "CAULD", "CAULS", "CAUMS", "CAUPS", "CAURI", "CAUSA", "CAVAS", "CAVED", "CAVEL", "CAVER", "CAVES", "CAVIE", "CAWED", "CAWKS", "CAXON", "CEAZE", "CEBID", "CECAL", "CECUM", "CEDED", "CEDER", "CEDES", "CEDIS", "CEIBA", "CEILI", "CEILS", "CELEB", "CELLA", "CELLI", "CELLS", "CELOM", "CELTS", "CENSE", "CENTO", "CENTS", "CENTU", "CEORL", "CEPES", "CERCI", "CERED", "CERES", "CERGE", "CERIA", "CERIC", "CERNE", "CEROC", "CEROS", "CERTS", "CERTY", "CESSE", "CESTA", "CESTI", "CETES", "CETYL", "CEZVE", "CHACE", "CHACK", "CHACO", "CHADO", "CHADS", "CHAFT", "CHAIS", "CHALS", "CHAMS", "CHANA", "CHANG", "CHANK", "CHAPE", "CHAPS", "CHAPT", "CHARA", "CHARE", "CHARK", "CHARR", "CHARS", "CHARY", "CHATS", "CHAVE", "CHAVS", "CHAWK", "CHAWS", "CHAYA", "CHAYS", "CHEEP", "CHEFS", "CHEKA", "CHELA", "CHELP", "CHEMO", "CHEMS", "CHERE", "CHERT", "CHETH", "CHEVY", "CHEWS", "CHEWY", "CHIAO", "CHIAS", "CHIBS", "CHICA", "CHICH", "CHICO", "CHICS", "CHIEL", "CHIKS", "CHILE", "CHIMB", "CHIMO", "CHIMP", "CHINE", "CHING", "CHINK", "CHINO", "CHINS", "CHIPS", "CHIRK", "CHIRL", "CHIRM", "CHIRO", "CHIRR", "CHIRT", "CHIRU", "CHITS", "CHIVE", "CHIVS", "CHIVY", "CHIZZ", "CHOCO", "CHOCS", "CHODE", "CHOGS", "CHOIL", "CHOKO", "CHOKY", "CHOLA", "CHOLI", "CHOLO", "CHOMP", "CHONS", "CHOOF", "CHOOK", "CHOOM", "CHOON", "CHOPS", "CHOTA", "CHOTT", "CHOUT", "CHOUX", "CHOWK", "CHOWS", "CHUBS", "CHUFA", "CHUFF", "CHUGS", "CHUMS", "CHURL", "CHURR", "CHUSE", "CHUTS", "CHYLE", "CHYME", "CHYND", "CIBOL", "CIDED", "CIDES", "CIELS", "CIGGY", "CILIA", "CILLS", "CIMAR", "CIMEX", "CINCT", "CINES", "CINQS", "CIONS", "CIPPI", "CIRCS", "CIRES", "CIRLS", "CIRRI", "CISCO", "CISSY", "CISTS", "CITAL", "CITED", "CITER", "CITES", "CIVES", "CIVET", "CIVIE", "CIVVY", "CLACH", "CLADE", "CLADS", "CLAES", "CLAGS", "CLAME", "CLAMS", "CLANS", "CLAPS", "CLAPT", "CLARO", "CLART", "CLARY", "CLAST", "CLATS", "CLAUT", "CLAVE", "CLAVI", "CLAWS", "CLAYS", "CLECK", "CLEEK", "CLEEP", "CLEFS", "CLEGS", "CLEIK", "CLEMS", "CLEPE", "CLEPT", "CLEVE", "CLEWS", "CLIED", "CLIES", "CLIFT", "CLIME", "CLINE", "CLINT", "CLIPE", "CLIPS", "CLIPT", "CLITS", "CLOAM", "CLODS", "CLOFF", "CLOGS", "CLOKE", "CLOMB", "CLOMP", "CLONK", "CLONS", "CLOOP", "CLOOT", "CLOPS", "CLOTE", "CLOTS", "CLOUR", "CLOUS", "CLOWS", "CLOYE", "CLOYS", "CLOZE", "CLUBS", "CLUES", "CLUEY", "CLUNK", "CLYPE", "CNIDA", "COACT", "COADY", "COALA", "COALS", "COALY", "COAPT", "COARB", "COATE", "COATI", "COATS", "COBBS", "COBBY", "COBIA", "COBLE", "COBZA", "COCAS", "COCCI", "COCCO", "COCKS", "COCKY", "COCOS", "CODAS", "CODEC", "CODED", "CODEN", "CODER", "CODES", "CODEX", "CODON", "COEDS", "COFFS", "COGIE", "COGON", "COGUE", "COHAB", "COHEN", "COHOE", "COHOG", "COHOS", "COIFS", "COIGN", "COILS", "COINS", "COIRS", "COITS", "COKED", "COKES", "COLAS", "COLBY", "COLDS", "COLED", "COLES", "COLEY", "COLIC", "COLIN", "COLLS", "COLLY", "COLOG", "COLTS", "COLZA", "COMAE", "COMAL", "COMAS", "COMBE", "COMBI", "COMBO", "COMBS", "COMBY", "COMER", "COMES", "COMIX", "COMMO", "COMMS", "COMMY", "COMPO", "COMPS", "COMPT", "COMTE", "COMUS", "CONED", "CONES", "CONEY", "CONFS", "CONGA", "CONGE", "CONGO", "CONIA", "CONIN", "CONKS", "CONKY", "CONNE", "CONNS", "CONTE", "CONTO", "CONUS", "CONVO", "COOCH", "COOED", "COOEE", "COOER", "COOEY", "COOFS", "COOKS", "COOKY", "COOLS", "COOLY", "COOMB", "COOMS", "COOMY", "COONS", "COOPS", "COOPT", "COOST", "COOTS", "COOZE", "COPAL", "COPAY", "COPED", "COPEN", "COPER", "COPES", "COPPY", "COPRA", "COPSY", "COQUI", "CORAM", "CORBE", "CORBY", "CORDS", "CORED", "CORES", "COREY", "CORGI", "CORIA", "CORKS", "CORKY", "CORMS", "CORNI", "CORNO", "CORNS", "CORNU", "CORPS", "CORSE", "CORSO", "COSEC", "COSED", "COSES", "COSET", "COSEY", "COSIE", "COSTA", "COSTE", "COSTS", "COTAN", "COTED", "COTES", "COTHS", "COTTA", "COTTS", "COUDE", "COUPS", "COURB", "COURD", "COURE", "COURS", "COUTA", "COUTH", "COVED", "COVES", "COVIN", "COWAL", "COWAN", "COWED", "COWKS", "COWLS", "COWPS", "COWRY", "COXAE", "COXAL", "COXED", "COXES", "COXIB", "COYAU", "COYED", "COYER", "COYPU", "COZED", "COZEN", "COZES", "COZEY", "COZIE", "CRAAL", "CRABS", "CRAGS", "CRAIC", "CRAIG", "CRAKE", "CRAME", "CRAMS", "CRANS", "CRAPE", "CRAPS", "CRAPY", "CRARE", "CRAWS", "CRAYS", "CREDS", "CREEL", "CREES", "CREMS", "CRENA", "CREPS", "CREPY", "CREWE", "CREWS", "CRIAS", "CRIBS", "CRIES", "CRIMS", "CRINE", "CRIOS", "CRIPE", "CRIPS", "CRISE", "CRITH", "CRITS", "CROCI", "CROCS", "CROFT", "CROGS", "CROMB", "CROME", "CRONK", "CRONS", "CROOL", "CROON", "CROPS", "CRORE", "CROST", "CROUT", "CROWS", "CROZE", "CRUCK", "CRUDO", "CRUDS", "CRUDY", "CRUES", "CRUET", "CRUFT", "CRUNK", "CRUOR", "CRURA", "CRUSE", "CRUSY", "CRUVE", "CRWTH", "CRYER", "CTENE", "CUBBY", "CUBEB", "CUBED", "CUBER", "CUBES", "CUBIT", "CUDDY", "CUFFO", "CUFFS", "CUIFS", "CUING", "CUISH", "CUITS", "CUKES", "CULCH", "CULET", "CULEX", "CULLS", "CULLY", "CULMS", "CULPA", "CULTI", "CULTS", "CULTY", "CUMEC", "CUNDY", "CUNEI", "CUNIT", "CUNTS", "CUPEL", "CUPID", "CUPPA", "CUPPY", "CURAT", "CURBS", "CURCH", "CURDS", "CURDY", "CURED", "CURER", "CURES", "CURET", "CURFS", "CURIA", "CURIE", "CURLI", "CURLS", "CURNS", "CURNY", "CURRS", "CURSI", "CURST", "CUSEC", "CUSHY", "CUSKS", "CUSPS", "CUSPY", "CUSSO", "CUSUM", "CUTCH", "CUTER", "CUTES", "CUTEY", "CUTIN", "CUTIS", "CUTTO", "CUTTY", "CUTUP", "CUVEE", "CUZES", "CWTCH", "CYANO", "CYANS", "CYCAD", "CYCAS", "CYCLO", "CYDER", "CYLIX", "CYMAE", "CYMAR", "CYMAS", "CYMES", "CYMOL", "CYSTS", "CYTES", "CYTON", "CZARS", "DAALS", "DABBA", "DACES", "DACHA", "DACKS", "DADAH", "DADAS", "DADOS", "DAFFS", "DAFFY", "DAGGA", "DAGGY", "DAGOS", "DAHLS", "DAIKO", "DAINE", "DAINT", "DAKER", "DALED", "DALES", "DALIS", "DALLE", "DALTS", "DAMAN", "DAMAR", "DAMES", "DAMME", "DAMNS", "DAMPS", "DAMPY", "DANCY", "DANGS", "DANIO", "DANKS", "DANNY", "DANTS", "DARAF", "DARBS", "DARCY", "DARED", "DARER", "DARES", "DARGA", "DARGS", "DARIC", "DARIS", "DARKS", "DARKY", "DARNS", "DARRE", "DARTS", "DARZI", "DASHI", "DASHY", "DATAL", "DATED", "DATER", "DATES", "DATOS", "DATTO", "DAUBE", "DAUBS", "DAUBY", "DAUDS", "DAULT", "DAURS", "DAUTS", "DAVEN", "DAVIT", "DAWAH", "DAWDS", "DAWED", "DAWEN", "DAWKS", "DAWNS", "DAWTS", "DAYAN", "DAYCH", "DAYNT", "DAZED", "DAZER", "DAZES", "DEADS", "DEAIR", "DEALS", "DEANS", "DEARE", "DEARN", "DEARS", "DEARY", "DEASH", "DEAVE", "DEAWS", "DEAWY", "DEBAG", "DEBBY", "DEBEL", "DEBES", "DEBTS", "DEBUD", "DEBUR", "DEBUS", "DEBYE", "DECAD", "DECAF", "DECAN", "DECKO", "DECKS", "DECOS", "DEDAL", "DEEDS", "DEEDY", "DEELY", "DEEMS", "DEENS", "DEEPS", "DEERE", "DEERS", "DEETS", "DEEVE", "DEEVS", "DEFAT", "DEFFO", "DEFIS", "DEFOG", "DEGAS", "DEGUM", "DEGUS", "DEICE", "DEIDS", "DEIFY", "DEILS", "DEISM", "DEIST", "DEKED", "DEKES", "DEKKO", "DELED", "DELES", "DELFS", "DELFT", "DELIS", "DELLS", "DELLY", "DELOS", "DELPH", "DELTS", "DEMAN", "DEMES", "DEMIC", "DEMIT", "DEMOB", "DEMOI", "DEMOS", "DEMPT", "DENAR", "DENAY", "DENCH", "DENES", "DENET", "DENIS", "DENTS", "DEOXY", "DERAT", "DERAY", "DERED", "DERES", "DERIG", "DERMA", "DERMS", "DERNS", "DERNY", "DEROS", "DERRO", "DERRY", "DERTH", "DERVS", "DESEX", "DESHI", "DESIS", "DESKS", "DESSE", "DEVAS", "DEVEL", "DEVIS", "DEVON", "DEVOS", "DEVOT", "DEWAN", "DEWAR", "DEWAX", "DEWED", "DEXES", "DEXIE", "DHABA", "DHAKS", "DHALS", "DHIKR", "DHOBI", "DHOLE", "DHOLL", "DHOLS", "DHOTI", "DHOWS", "DHUTI", "DIACT", "DIALS", "DIANE", "DIAZO", "DIBBS", "DICED", "DICER", "DICES", "DICHT", "DICKS", "DICKY", "DICOT", "DICTA", "DICTS", "DICTY", "DIDDY", "DIDIE", "DIDOS", "DIDST", "DIEBS", "DIELS", "DIENE", "DIETS", "DIFFS", "DIGHT", "DIKAS", "DIKED", "DIKER", "DIKES", "DIKEY", "DILDO", "DILLI", "DILLS", "DIMBO", "DIMER", "DIMES", "DIMPS", "DINAR", "DINED", "DINES", "DINGE", "DINGS", "DINIC", "DINKS", "DINKY", "DINNA", "DINOS", "DINTS", "DIOLS", "DIOTA", "DIPPY", "DIPSO", "DIRAM", "DIRER", "DIRKE", "DIRKS", "DIRLS", "DIRTS", "DISAS", "DISCI", "DISCS", "DISHY", "DISKS", "DISME", "DITAL", "DITAS", "DITED", "DITES", "DITSY", "DITTS", "DITZY", "DIVAN", "DIVAS", "DIVED", "DIVES", "DIVIS", "DIVNA", "DIVOS", "DIVOT", "DIVVY", "DIWAN", "DIXIE", "DIXIT", "DIYAS", "DIZEN", "DJINN", "DJINS", "DOABS", "DOATS", "DOBBY", "DOBES", "DOBIE", "DOBLA", "DOBRA", "DOBRO", "DOCHT", "DOCKS", "DOCOS", "DOCUS", "DODDY", "DODOS", "DOEKS", "DOERS", "DOEST", "DOETH", "DOFFS", "DOGAN", "DOGES", "DOGEY", "DOGGO", "DOGGY", "DOGIE", "DOHYO", "DOILT", "DOILY", "DOITS", "DOJOS", "DOLCE", "DOLCI", "DOLED", "DOLES", "DOLIA", "DOLLS", "DOLMA", "DOLOR", "DOLOS", "DOLTS", "DOMAL", "DOMED", "DOMES", "DOMIC", "DONAH", "DONAS", "DONEE", "DONER", "DONGA", "DONGS", "DONKO", "DONNA", "DONNE", "DONNY", "DONSY", "DOOBS", "DOOCE", "DOODY", "DOOKS", "DOOLE", "DOOLS", "DOOLY", "DOOMS", "DOOMY", "DOONA", "DOORN", "DOORS", "DOOZY", "DOPAS", "DOPED", "DOPER", "DOPES", "DORAD", "DORBA", "DORBS", "DOREE", "DORES", "DORIC", "DORIS", "DORKS", "DORKY", "DORMS", "DORMY", "DORPS", "DORRS", "DORSA", "DORSE", "DORTS", "DORTY", "DOSAI", "DOSAS", "DOSED", "DOSEH", "DOSER", "DOSES", "DOSHA", "DOTAL", "DOTED", "DOTER", "DOTES", "DOTTY", "DOUAR", "DOUCE", "DOUCS", "DOUKS", "DOULA", "DOUMA", "DOUMS", "DOUPS", "DOURA", "DOUSE", "DOUTS", "DOVED", "DOVEN", "DOVER", "DOVES", "DOVIE", "DOWAR", "DOWDS", "DOWED", "DOWER", "DOWIE", "DOWLE", "DOWLS", "DOWLY", "DOWNA", "DOWNS", "DOWPS", "DOWSE", "DOWTS", "DOXED", "DOXES", "DOXIE", "DOYEN", "DOYLY", "DOZED", "DOZER", "DOZES", "DRABS", "DRACK", "DRACO", "DRAFF", "DRAGS", "DRAIL", "DRAMS", "DRANT", "DRAPS", "DRATS", "DRAVE", "DRAWS", "DRAYS", "DREAR", "DRECK", "DREED", "DREER", "DREES", "DREGS", "DREKS", "DRENT", "DRERE", "DREST", "DREYS", "DRIBS", "DRICE", "DRIES", "DRILY", "DRIPS", "DRIPT", "DROID", "DROIL", "DROKE", "DROLE", "DROME", "DRONY", "DROOB", "DROOG", "DROOK", "DROPS", "DROPT", "DROUK", "DROWS", "DRUBS", "DRUGS", "DRUMS", "DRUPE", "DRUSE", "DRUSY", "DRUXY", "DRYAD", "DRYAS", "DSOBO", "DSOMO", "DUADS", "DUALS", "DUANS", "DUARS", "DUBBO", "DUCAL", "DUCAT", "DUCES", "DUCKS", "DUCKY", "DUCTS", "DUDDY", "DUDED", "DUDES", "DUELS", "DUETS", "DUETT", "DUFFS", "DUFUS", "DUING", "DUITS", "DUKAS", "DUKED", "DUKES", "DUKKA", "DULCE", "DULES", "DULIA", "DULLS", "DULSE", "DUMAS", "DUMBO", "DUMBS", "DUMKA", "DUMKY", "DUMPS", "DUNAM", "DUNCH", "DUNES", "DUNGS", "DUNGY", "DUNKS", "DUNNO", "DUNNY", "DUNSH", "DUNTS", "DUOMI", "DUOMO", "DUPED", "DUPER", "DUPES", "DUPLE", "DUPLY", "DUPPY", "DURAL", "DURAS", "DURED", "DURES", "DURGY", "DURNS", "DUROC", "DUROS", "DUROY", "DURRA", "DURRS", "DURRY", "DURST", "DURUM", "DURZI", "DUSKS", "DUSTS", "DUXES", "DWAAL", "DWALE", "DWALM", "DWAMS", "DWANG", "DWAUM", "DWEEB", "DWILE", "DWINE", "DYADS", "DYERS", "DYKED", "DYKES", "DYKEY", "DYKON", "DYNEL", "DYNES", "DZHOS", "EAGRE", "EALED", "EALES", "EANED", "EARDS", "EARED", "EARLS", "EARNS", "EARNT", "EARST", "EASED", "EASER", "EASES", "EASLE", "EASTS", "EATHE", "EAVED", "EAVES", "EBBED", "EBBET", "EBONS", "EBOOK", "ECADS", "ECHED", "ECHES", "ECHOS", "ECRUS", "EDEMA", "EDGED", "EDGER", "EDGES", "EDILE", "EDITS", "EDUCE", "EDUCT", "EEJIT", "EENSY", "EEVEN", "EEVNS", "EFFED", "EGADS", "EGERS", "EGEST", "EGGAR", "EGGED", "EGGER", "EGMAS", "EHING", "EIDER", "EIDOS", "EIGNE", "EIKED", "EIKON", "EILDS", "EISEL", "EJIDO", "EKKAS", "ELAIN", "ELAND", "ELANS", "ELCHI", "ELDIN", "ELEMI", "ELFED", "ELIAD", "ELINT", "ELMEN", "ELOGE", "ELOGY", "ELOIN", "ELOPS", "ELPEE", "ELSIN", "ELUTE", "ELVAN", "ELVEN", "ELVER", "ELVES", "EMACS", "EMBAR", "EMBAY", "EMBOG", "EMBOW", "EMBOX", "EMBUS", "EMEER", "EMEND", "EMERG", "EMERY", "EMEUS", "EMICS", "EMIRS", "EMITS", "EMMAS", "EMMER", "EMMET", "EMMEW", "EMMYS", "EMOJI", "EMONG", "EMOTE", "EMOVE", "EMPTS", "EMULE", "EMURE", "EMYDE", "EMYDS", "ENARM", "ENATE", "ENDED", "ENDER", "ENDEW", "ENDUE", "ENEWS", "ENFIX", "ENIAC", "ENLIT", "ENMEW", "ENNOG", "ENOKI", "ENOLS", "ENORM", "ENOWS", "ENROL", "ENSEW", "ENSKY", "ENTIA", "ENURE", "ENURN", "ENVOI", "ENZYM", "EORLS", "EOSIN", "EPACT", "EPEES", "EPHAH", "EPHAS", "EPHOD", "EPHOR", "EPICS", "EPODE", "EPOPT", "EPRIS", "EQUES", "EQUID", "ERBIA", "EREVS", "ERGON", "ERGOS", "ERGOT", "ERHUS", "ERICA", "ERICK", "ERICS", "ERING", "ERNED", "ERNES", "EROSE", "ERRED", "ERSES", "ERUCT", "ERUGO", "ERUVS", "ERVEN", "ERVIL", "ESCAR", "ESCOT", "ESILE", "ESKAR", "ESKER", "ESNES", "ESSES", "ESTOC", "ESTOP", "ESTRO", "ETAGE", "ETAPE", "ETATS", "ETENS", "ETHAL", "ETHNE", "ETHYL", "ETICS", "ETNAS", "ETTIN", "ETTLE", "ETUIS", "ETWEE", "ETYMA", "EUGHS", "EUKED", "EUPAD", "EUROS", "EUSOL", "EVENS", "EVERT", "EVETS", "EVHOE", "EVILS", "EVITE", "EVOHE", "EWERS", "EWEST", "EWHOW", "EWKED", "EXAMS", "EXEAT", "EXECS", "EXEEM", "EXEME", "EXFIL", "EXIES", "EXINE", "EXING", "EXITS", "EXODE", "EXOME", "EXONS", "EXPAT", "EXPOS", "EXUDE", "EXULS", "EXURB", "EYASS", "EYERS", "EYOTS", "EYRAS", "EYRES", "EYRIE", "EYRIR", "EZINE", "FABBY", "FACED", "FACER", "FACES", "FACIA", "FACTA", "FACTS", "FADDY", "FADED", "FADER", "FADES", "FADGE", "FADOS", "FAENA", "FAERY", "FAFFS", "FAFFY", "FAGGY", "FAGIN", "FAGOT", "FAIKS", "FAILS", "FAINE", "FAINS", "FAIRS", "FAKED", "FAKER", "FAKES", "FAKEY", "FAKIE", "FAKIR", "FALAJ", "FALLS", "FAMED", "FAMES", "FANAL", "FANDS", "FANES", "FANGA", "FANGO", "FANGS", "FANKS", "FANON", "FANOS", "FANUM", "FAQIR", "FARAD", "FARCI", "FARCY", "FARDS", "FARED", "FARER", "FARES", "FARLE", "FARLS", "FARMS", "FAROS", "FARRO", "FARSE", "FARTS", "FASCI", "FASTI", "FASTS", "FATED", "FATES", "FATLY", "FATSO", "FATWA", "FAUGH", "FAULD", "FAUNS", "FAURD", "FAUTS", "FAUVE", "FAVAS", "FAVEL", "FAVER", "FAVES", "FAVUS", "FAWNS", "FAWNY", "FAXED", "FAXES", "FAYED", "FAYER", "FAYNE", "FAYRE", "FAZED", "FAZES", "FEALS", "FEARE", "FEARS", "FEART", "FEASE", "FEATS", "FEAZE", "FECES", "FECHT", "FECIT", "FECKS", "FEDEX", "FEEBS", "FEEDS", "FEELS", "FEENS", "FEERS", "FEESE", "FEEZE", "FEHME", "FEINT", "FEIST", "FELCH", "FELID", "FELLS", "FELLY", "FELTS", "FELTY", "FEMAL", "FEMES", "FEMMY", "FENDS", "FENDY", "FENIS", "FENKS", "FENNY", "FENTS", "FEODS", "FEOFF", "FERER", "FERES", "FERIA", "FERLY", "FERMI", "FERMS", "FERNS", "FERNY", "FESSE", "FESTA", "FESTS", "FESTY", "FETAS", "FETED", "FETES", "FETOR", "FETTA", "FETTS", "FETWA", "FEUAR", "FEUDS", "FEUED", "FEYED", "FEYER", "FEYLY", "FEZES", "FEZZY", "FIARS", "FIATS", "FIBRE", "FIBRO", "FICES", "FICHE", "FICHU", "FICIN", "FICOS", "FIDES", "FIDGE", "FIDOS", "FIEFS", "FIENT", "FIERE", "FIERS", "FIEST", "FIFED", "FIFER", "FIFES", "FIFIS", "FIGGY", "FIGOS", "FIKED", "FIKES", "FILAR", "FILCH", "FILED", "FILES", "FILII", "FILKS", "FILLE", "FILLO", "FILLS", "FILMI", "FILMS", "FILOS", "FILUM", "FINCA", "FINDS", "FINED", "FINES", "FINIS", "FINKS", "FINNY", "FINOS", "FIORD", "FIQHS", "FIQUE", "FIRED", "FIRER", "FIRES", "FIRIE", "FIRKS", "FIRMS", "FIRNS", "FIRRY", "FIRTH", "FISCS", "FISKS", "FISTS", "FISTY", "FITCH", "FITLY", "FITNA", "FITTE", "FITTS", "FIVER", "FIVES", "FIXED", "FIXES", "FIXIT", "FJELD", "FLABS", "FLAFF", "FLAGS", "FLAKS", "FLAMM", "FLAMS", "FLAMY", "FLANE", "FLANS", "FLAPS", "FLARY", "FLATS", "FLAVA", "FLAWN", "FLAWS", "FLAWY", "FLAXY", "FLAYS", "FLEAM", "FLEAS", "FLEEK", "FLEER", "FLEES", "FLEGS", "FLEME", "FLEUR", "FLEWS", "FLEXI", "FLEXO", "FLEYS", "FLICS", "FLIED", "FLIES", "FLIMP", "FLIMS", "FLIPS", "FLIRS", "FLISK", "FLITE", "FLITS", "FLITT", "FLOBS", "FLOCS", "FLOES", "FLOGS", "FLONG", "FLOPS", "FLORS", "FLORY", "FLOSH", "FLOTA", "FLOTE", "FLOWS", "FLUBS", "FLUED", "FLUES", "FLUEY", "FLUKY", "FLUMP", "FLUOR", "FLURR", "FLUTY", "FLUYT", "FLYBY", "FLYPE", "FLYTE", "FOALS", "FOAMS", "FOEHN", "FOGEY", "FOGIE", "FOGLE", "FOGOU", "FOHNS", "FOIDS", "FOILS", "FOINS", "FOLDS", "FOLEY", "FOLIA", "FOLIC", "FOLIE", "FOLKS", "FOLKY", "FOMES", "FONDA", "FONDS", "FONDU", "FONES", "FONLY", "FONTS", "FOODS", "FOODY", "FOOLS", "FOOTS", "FOOTY", "FORAM", "FORBS", "FORBY", "FORDO", "FORDS", "FOREL", "FORES", "FOREX", "FORKS", "FORKY", "FORME", "FORMS", "FORTS", "FORZA", "FORZE", "FOSSA", "FOSSE", "FOUAT", "FOUDS", "FOUER", "FOUET", "FOULE", "FOULS", "FOUNT", "FOURS", "FOUTH", "FOVEA", "FOWLS", "FOWTH", "FOXED", "FOXES", "FOXIE", "FOYLE", "FOYNE", "FRABS", "FRACK", "FRACT", "FRAGS", "FRAIM", "FRANC", "FRAPE", "FRAPS", "FRASS", "FRATE", "FRATI", "FRATS", "FRAUS", "FRAYS", "FREES", "FREET", "FREIT", "FREMD", "FRENA", "FREON", "FRERE", "FRETS", "FRIBS", "FRIER", "FRIES", "FRIGS", "FRISE", "FRIST", "FRITH", "FRITS", "FRITT", "FRIZE", "FRIZZ", "FROES", "FROGS", "FRONS", "FRORE", "FRORN", "FRORY", "FROSH", "FROWS", "FROWY", "FRUGS", "FRUMP", "FRUSH", "FRUST", "FRYER", "FUBAR", "FUBBY", "FUBSY", "FUCKS", "FUCUS", "FUDDY", "FUDGY", "FUELS", "FUERO", "FUFFS", "FUFFY", "FUGAL", "FUGGY", "FUGIE", "FUGIO", "FUGLE", "FUGLY", "FUGUS", "FUJIS", "FULLS", "FUMED", "FUMER", "FUMES", "FUMET", "FUNDI", "FUNDS", "FUNDY", "FUNGO", "FUNGS", "FUNKS", "FURAL", "FURAN", "FURCA", "FURLS", "FUROL", "FURRS", "FURTH", "FURZE", "FURZY", "FUSED", "FUSEE", "FUSEL", "FUSES", "FUSIL", "FUSKS", "FUSTS", "FUSTY", "FUTON", "FUZED", "FUZEE", "FUZES", "FUZIL", "FYCES", "FYKED", "FYKES", "FYLES", "FYRDS", "FYTTE", "GABBA", "GABBY", "GABLE", "GADDI", "GADES", "GADGE", "GADID", "GADIS", "GADJE", "GADJO", "GADSO", "GAFFS", "GAGED", "GAGER", "GAGES", "GAIDS", "GAINS", "GAIRS", "GAITA", "GAITS", "GAITT", "GAJOS", "GALAH", "GALAS", "GALAX", "GALEA", "GALED", "GALES", "GALLS", "GALLY", "GALOP", "GALUT", "GALVO", "GAMAS", "GAMAY", "GAMBA", "GAMBE", "GAMBO", "GAMBS", "GAMED", "GAMES", "GAMEY", "GAMIC", "GAMIN", "GAMME", "GAMMY", "GAMPS", "GANCH", "GANDY", "GANEF", "GANEV", "GANGS", "GANJA", "GANOF", "GANTS", "GAOLS", "GAPED", "GAPER", "GAPES", "GAPOS", "GAPPY", "GARBE", "GARBO", "GARBS", "GARDA", "GARES", "GARIS", "GARMS", "GARNI", "GARRE", "GARTH", "GARUM", "GASES", "GASPS", "GASPY", "GASTS", "GATCH", "GATED", "GATER", "GATES", "GATHS", "GATOR", "GAUCH", "GAUCY", "GAUDS", "GAUJE", "GAULT", "GAUMS", "GAUMY", "GAUPS", "GAURS", "GAUSS", "GAUZY", "GAVOT", "GAWCY", "GAWDS", "GAWKS", "GAWPS", "GAWSY", "GAYAL", "GAZAL", "GAZAR", "GAZED", "GAZES", "GAZON", "GAZOO", "GEALS", "GEANS", "GEARE", "GEARS", "GEATS", "GEBUR", "GECKS", "GEEKS", "GEEPS", "GEEST", "GEIST", "GEITS", "GELDS", "GELEE", "GELID", "GELLY", "GELTS", "GEMEL", "GEMMA", "GEMMY", "GEMOT", "GENAL", "GENAS", "GENES", "GENET", "GENIC", "GENII", "GENIP", "GENNY", "GENOA", "GENOM", "GENRO", "GENTS", "GENTY", "GENUA", "GENUS", "GEODE", "GEOID", "GERAH", "GERBE", "GERES", "GERLE", "GERMS", "GERMY", "GERNE", "GESSE", "GESSO", "GESTE", "GESTS", "GETAS", "GETUP", "GEUMS", "GEYAN", "GEYER", "GHAST", "GHATS", "GHAUT", "GHAZI", "GHEES", "GHEST", "GHYLL", "GIBED", "GIBEL", "GIBER", "GIBES", "GIBLI", "GIBUS", "GIFTS", "GIGAS", "GIGHE", "GIGOT", "GIGUE", "GILAS", "GILDS", "GILET", "GILLS", "GILLY", "GILPY", "GILTS", "GIMEL", "GIMME", "GIMPS", "GIMPY", "GINCH", "GINGE", "GINGS", "GINKS", "GINNY", "GINZO", "GIPON", "GIPPO", "GIPPY", "GIRDS", "GIRLS", "GIRNS", "GIRON", "GIROS", "GIRRS", "GIRSH", "GIRTS", "GISMO", "GISMS", "GISTS", "GITCH", "GITES", "GIUST", "GIVED", "GIVES", "GIZMO", "GLACE", "GLADS", "GLADY", "GLAIK", "GLAIR", "GLAMS", "GLANS", "GLARY", "GLAUM", "GLAUR", "GLAZY", "GLEBA", "GLEBE", "GLEBY", "GLEDE", "GLEDS", "GLEED", "GLEEK", "GLEES", "GLEET", "GLEIS", "GLENS", "GLENT", "GLEYS", "GLIAL", "GLIAS", "GLIBS", "GLIFF", "GLIFT", "GLIKE", "GLIME", "GLIMS", "GLISK", "GLITS", "GLITZ", "GLOAM", "GLOBI", "GLOBS", "GLOBY", "GLODE", "GLOGG", "GLOMS", "GLOOP", "GLOPS", "GLOST", "GLOUT", "GLOWS", "GLOZE", "GLUED", "GLUER", "GLUES", "GLUEY", "GLUGS", "GLUME", "GLUMS", "GLUON", "GLUTE", "GLUTS", "GNARL", "GNARR", "GNARS", "GNATS", "GNAWN", "GNAWS", "GNOWS", "GOADS", "GOAFS", "GOALS", "GOARY", "GOATS", "GOATY", "GOBAN", "GOBAR", "GOBBI", "GOBBO", "GOBBY", "GOBIS", "GOBOS", "GODET", "GODSO", "GOELS", "GOERS", "GOEST", "GOETH", "GOETY", "GOFER", "GOFFS", "GOGGA", "GOGOS", "GOIER", "GOJIS", "GOLDS", "GOLDY", "GOLES", "GOLFS", "GOLPE", "GOLPS", "GOMBO", "GOMER", "GOMPA", "GONCH", "GONEF", "GONGS", "GONIA", "GONIF", "GONKS", "GONNA", "GONOF", "GONYS", "GONZO", "GOOBY", "GOODS", "GOOFS", "GOOGS", "GOOKS", "GOOKY", "GOOLD", "GOOLS", "GOOLY", "GOONS", "GOONY", "GOOPS", "GOOPY", "GOORS", "GOORY", "GOOSY", "GOPAK", "GOPIK", "GORAL", "GORAS", "GORED", "GORES", "GORIS", "GORMS", "GORMY", "GORPS", "GORSE", "GORSY", "GOSHT", "GOSSE", "GOTCH", "GOTHS", "GOTHY", "GOTTA", "GOUCH", "GOUKS", "GOURA", "GOUTS", "GOUTY", "GOWAN", "GOWDS", "GOWFS", "GOWKS", "GOWLS", "GOWNS", "GOXES", "GOYIM", "GOYLE", "GRAAL", "GRABS", "GRADS", "GRAFF", "GRAIP", "GRAMA", "GRAME", "GRAMP", "GRAMS", "GRANA", "GRANS", "GRAPY", "GRAVS", "GRAYS", "GREBE", "GREBO", "GRECE", "GREEK", "GREES", "GREGE", "GREGO", "GREIN", "GRENS", "GRESE", "GREVE", "GREWS", "GREYS", "GRICE", "GRIDE", "GRIDS", "GRIFF", "GRIFT", "GRIGS", "GRIKE", "GRINS", "GRIOT", "GRIPS", "GRIPT", "GRIPY", "GRISE", "GRIST", "GRISY", "GRITH", "GRITS", "GRIZE", "GROAT", "GRODY", "GROGS", "GROKS", "GROMA", "GRONE", "GROOF", "GROSZ", "GROTS", "GROUF", "GROVY", "GROWS", "GRRLS", "GRRRL", "GRUBS", "GRUED", "GRUES", "GRUFE", "GRUME", "GRUMP", "GRUND", "GRYCE", "GRYDE", "GRYKE", "GRYPE", "GRYPT", "GUACO", "GUANA", "GUANO", "GUANS", "GUARS", "GUCKS", "GUCKY", "GUDES", "GUFFS", "GUGAS", "GUIDS", "GUIMP", "GUIRO", "GULAG", "GULAR", "GULAS", "GULES", "GULET", "GULFS", "GULFY", "GULLS", "GULPH", "GULPS", "GULPY", "GUMMA", "GUMMI", "GUMPS", "GUNDY", "GUNGE", "GUNGY", "GUNKS", "GUNKY", "GUNNY", "GUQIN", "GURDY", "GURGE", "GURLS", "GURLY", "GURNS", "GURRY", "GURSH", "GURUS", "GUSHY", "GUSLA", "GUSLE", "GUSLI", "GUSSY", "GUSTS", "GUTSY", "GUTTA", "GUTTY", "GUYED", "GUYLE", "GUYOT", "GUYSE", "GWINE", "GYALS", "GYANS", "GYBED", "GYBES", "GYELD", "GYMPS", "GYNAE", "GYNIE", "GYNNY", "GYNOS", "GYOZA", "GYPOS", "GYPPO", "GYPPY", "GYRAL", "GYRED", "GYRES", "GYRON", "GYROS", "GYRUS", "GYTES", "GYVED", "GYVES", "HAAFS", "HAARS", "HABLE", "HABUS", "HACEK", "HACKS", "HADAL", "HADED", "HADES", "HADJI", "HADST", "HAEMS", "HAETS", "HAFFS", "HAFIZ", "HAFTS", "HAGGS", "HAHAS", "HAICK", "HAIKA", "HAIKS", "HAIKU", "HAILS", "HAILY", "HAINS", "HAINT", "HAIRS", "HAITH", "HAJES", "HAJIS", "HAJJI", "HAKAM", "HAKAS", "HAKEA", "HAKES", "HAKIM", "HAKUS", "HALAL", "HALED", "HALER", "HALES", "HALFA", "HALFS", "HALID", "HALLO", "HALLS", "HALMA", "HALMS", "HALON", "HALOS", "HALSE", "HALTS", "HALVA", "HALWA", "HAMAL", "HAMBA", "HAMED", "HAMES", "HAMMY", "HAMZA", "HANAP", "HANCE", "HANCH", "HANDS", "HANGI", "HANGS", "HANKS", "HANKY", "HANSA", "HANSE", "HANTS", "HAOLE", "HAOMA", "HAPAX", "HAPLY", "HAPPI", "HAPUS", "HARAM", "HARDS", "HARED", "HARES", "HARIM", "HARKS", "HARLS", "HARMS", "HARNS", "HAROS", "HARPS", "HARTS", "HASHY", "HASKS", "HASPS", "HASTA", "HATED", "HATES", "HATHA", "HAUDS", "HAUFS", "HAUGH", "HAULD", "HAULM", "HAULS", "HAULT", "HAUNS", "HAUSE", "HAVER", "HAVES", "HAWED", "HAWKS", "HAWMS", "HAWSE", "HAYED", "HAYER", "HAYEY", "HAYLE", "HAZAN", "HAZED", "HAZER", "HAZES", "HEADS", "HEALD", "HEALS", "HEAME", "HEAPS", "HEAPY", "HEARE", "HEARS", "HEAST", "HEATS", "HEBEN", "HEBES", "HECHT", "HECKS", "HEDER", "HEDGY", "HEEDS", "HEEDY", "HEELS", "HEEZE", "HEFTE", "HEFTS", "HEIDS", "HEIGH", "HEILS", "HEIRS", "HEJAB", "HEJRA", "HELED", "HELES", "HELIO", "HELLS", "HELMS", "HELOS", "HELOT", "HELPS", "HELVE", "HEMAL", "HEMES", "HEMIC", "HEMIN", "HEMPS", "HEMPY", "HENCH", "HENDS", "HENGE", "HENNA", "HENNY", "HENRY", "HENTS", "HEPAR", "HERBS", "HERBY", "HERDS", "HERES", "HERLS", "HERMA", "HERMS", "HERNS", "HEROS", "HERRY", "HERSE", "HERTZ", "HERYE", "HESPS", "HESTS", "HETES", "HETHS", "HEUCH", "HEUGH", "HEVEA", "HEWED", "HEWER", "HEWGH", "HEXAD", "HEXED", "HEXER", "HEXES", "HEXYL", "HEYED", "HIANT", "HICKS", "HIDED", "HIDER", "HIDES", "HIEMS", "HIGHS", "HIGHT", "HIJAB", "HIJRA", "HIKED", "HIKER", "HIKES", "HIKOI", "HILAR", "HILCH", "HILLO", "HILLS", "HILTS", "HILUM", "HILUS", "HIMBO", "HINAU", "HINDS", "HINGS", "HINKY", "HINNY", "HINTS", "HIOIS", "HIPLY", "HIRED", "HIREE", "HIRER", "HIRES", "HISSY", "HISTS", "HITHE", "HIVED", "HIVER", "HIVES", "HIZEN", "HOAED", "HOAGY", "HOARS", "HOARY", "HOAST", "HOBOS", "HOCKS", "HOCUS", "HODAD", "HODJA", "HOERS", "HOGAN", "HOGEN", "HOGGS", "HOGHS", "HOHED", "HOICK", "HOIED", "HOIKS", "HOING", "HOISE", "HOKAS", "HOKED", "HOKES", "HOKEY", "HOKIS", "HOKKU", "HOKUM", "HOLDS", "HOLED", "HOLES", "HOLEY", "HOLKS", "HOLLA", "HOLLO", "HOLME", "HOLMS", "HOLON", "HOLOS", "HOLTS", "HOMAS", "HOMED", "HOMES", "HOMEY", "HOMIE", "HOMME", "HOMOS", "HONAN", "HONDA", "HONDS", "HONED", "HONER", "HONES", "HONGI", "HONGS", "HONKS", "HONKY", "HOOCH", "HOODS", "HOODY", "HOOEY", "HOOFS", "HOOKA", "HOOKS", "HOOKY", "HOOLY", "HOONS", "HOOPS", "HOORD", "HOORS", "HOOSH", "HOOTS", "HOOTY", "HOOVE", "HOPAK", "HOPED", "HOPER", "HOPES", "HOPPY", "HORAH", "HORAL", "HORAS", "HORIS", "HORKS", "HORME", "HORNS", "HORST", "HORSY", "HOSED", "HOSEL", "HOSEN", "HOSER", "HOSES", "HOSEY", "HOSTA", "HOSTS", "HOTCH", "HOTEN", "HOTTY", "HOUFF", "HOUFS", "HOUGH", "HOURI", "HOURS", "HOUTS", "HOVEA", "HOVED", "HOVEN", "HOVES", "HOWBE", "HOWES", "HOWFF", "HOWFS", "HOWKS", "HOWLS", "HOWRE", "HOWSO", "HOXED", "HOXES", "HOYAS", "HOYED", "HOYLE", "HUBBY", "HUCKS", "HUDNA", "HUDUD", "HUERS", "HUFFS", "HUFFY", "HUGER", "HUGGY", "HUHUS", "HUIAS", "HULAS", "HULES", "HULKS", "HULKY", "HULLO", "HULLS", "HULLY", "HUMAS", "HUMFS", "HUMIC", "HUMPS", "HUMPY", "HUNKS", "HUNTS", "HURDS", "HURLS", "HURLY", "HURRA", "HURST", "HURTS", "HUSHY", "HUSKS", "HUSOS", "HUTIA", "HUZZA", "HUZZY", "HWYLS", "HYDRA", "HYENS", "HYGGE", "HYING", "HYKES", "HYLAS", "HYLEG", "HYLES", "HYLIC", "HYMNS", "HYNDE", "HYOID", "HYPED", "HYPES", "HYPHA", "HYPHY", "HYPOS", "HYRAX", "HYSON", "HYTHE", "IAMBI", "IAMBS", "IBRIK", "ICERS", "ICHED", "ICHES", "ICHOR", "ICIER", "ICKER", "ICKLE", "ICONS", "ICTAL", "ICTIC", "ICTUS", "IDANT", "IDEAS", "IDEES", "IDENT", "IDLED", "IDLES", "IDOLA", "IDOLS", "IDYLS", "IFTAR", "IGAPO", "IGGED", "IGLUS", "IHRAM", "IKANS", "IKATS", "IKONS", "ILEAC", "ILEAL", "ILEUM", "ILEUS", "ILIAD", "ILIAL", "ILIUM", "ILLER", "ILLTH", "IMAGO", "IMAMS", "IMARI", "IMAUM", "IMBAR", "IMBED", "IMIDE", "IMIDO", "IMIDS", "IMINE", "IMINO", "IMMEW", "IMMIT", "IMMIX", "IMPED", "IMPIS", "IMPOT", "IMPRO", "IMSHI", "IMSHY", "INAPT", "INARM", "INBYE", "INCEL", "INCLE", "INCOG", "INCUS", "INCUT", "INDEW", "INDIA", "INDIE", "INDOL", "INDOW", "INDRI", "INDUE", "INERM", "INFIX", "INFOS", "INFRA", "INGAN", "INGLE", "INION", "INKED", "INKER", "INKLE", "INNED", "INNIT", "INORB", "INRUN", "INSET", "INSPO", "INTEL", "INTIL", "INTIS", "INTRA", "INULA", "INURE", "INURN", "INUST", "INVAR", "INWIT", "IODIC", "IODID", "IODIN", "IOTAS", "IPPON", "IRADE", "IRIDS", "IRING", "IRKED", "IROKO", "IRONE", "IRONS", "ISBAS", "ISHES", "ISLED", "ISLES", "ISNAE", "ISSEI", "ISTLE", "ITEMS", "ITHER", "IVIED", "IVIES", "IXIAS", "IXNAY", "IXORA", "IXTLE", "IZARD", "IZARS", "IZZAT", "JAAPS", "JABOT", "JACAL", "JACKS", "JACKY", "JADED", "JADES", "JAFAS", "JAFFA", "JAGAS", "JAGER", "JAGGS", "JAGGY", "JAGIR", "JAGRA", "JAILS", "JAKER", "JAKES", "JAKEY", "JALAP", "JALOP", "JAMBE", "JAMBO", "JAMBS", "JAMBU", "JAMES", "JAMMY", "JAMON", "JANES", "JANNS", "JANNY", "JANTY", "JAPAN", "JAPED", "JAPER", "JAPES", "JARKS", "JARLS", "JARPS", "JARTA", "JARUL", "JASEY", "JASPE", "JASPS", "JATOS", "JAUKS", "JAUPS", "JAVAS", "JAVEL", "JAWAN", "JAWED", "JAXIE", "JEANS", "JEATS", "JEBEL", "JEDIS", "JEELS", "JEELY", "JEEPS", "JEERS", "JEEZE", "JEFES", "JEFFS", "JEHAD", "JEHUS", "JELAB", "JELLO", "JELLS", "JEMBE", "JEMMY", "JENNY", "JEONS", "JERID", "JERKS", "JERRY", "JESSE", "JESTS", "JESUS", "JETES", "JETON", "JEUNE", "JEWED", "JEWIE", "JHALA", "JIAOS", "JIBBA", "JIBBS", "JIBED", "JIBER", "JIBES", "JIFFS", "JIGGY", "JIGOT", "JIHAD", "JILLS", "JILTS", "JIMMY", "JIMPY", "JINGO", "JINKS", "JINNE", "JINNI", "JINNS", "JIRDS", "JIRGA", "JIRRE", "JISMS", "JIVED", "JIVER", "JIVES", "JIVEY", "JNANA", "JOBED", "JOBES", "JOCKO", "JOCKS", "JOCKY", "JOCOS", "JODEL", "JOEYS", "JOHNS", "JOINS", "JOKED", "JOKES", "JOKEY", "JOKOL", "JOLED", "JOLES", "JOLLS", "JOLTS", "JOLTY", "JOMON", "JOMOS", "JONES", "JONGS", "JONTY", "JOOKS", "JORAM", "JORUM", "JOTAS", "JOTTY", "JOTUN", "JOUAL", "JOUGS", "JOUKS", "JOULE", "JOURS", "JOWAR", "JOWED", "JOWLS", "JOWLY", "JOYED", "JUBAS", "JUBES", "JUCOS", "JUDAS", "JUDGY", "JUDOS", "JUGAL", "JUGUM", "JUJUS", "JUKED", "JUKES", "JUKUS", "JULEP", "JUMAR", "JUMBY", "JUMPS", "JUNCO", "JUNKS", "JUNKY", "JUPES", "JUPON", "JURAL", "JURAT", "JUREL", "JURES", "JUSTS", "JUTES", "JUTTY", "JUVES", "JUVIE", "KAAMA", "KABAB", "KABAR", "KABOB", "KACHA", "KACKS", "KADAI", "KADES", "KADIS", "KAFIR", "KAGOS", "KAGUS", "KAHAL", "KAIAK", "KAIDS", "KAIES", "KAIFS", "KAIKA", "KAIKS", "KAILS", "KAIMS", "KAING", "KAINS", "KAKAS", "KAKIS", "KALAM", "KALES", "KALIF", "KALIS", "KALPA", "KAMAS", "KAMES", "KAMIK", "KAMIS", "KAMME", "KANAE", "KANAS", "KANDY", "KANEH", "KANES", "KANGA", "KANGS", "KANJI", "KANTS", "KANZU", "KAONS", "KAPAS", "KAPHS", "KAPOK", "KAPOW", "KAPUS", "KAPUT", "KARAS", "KARAT", "KARKS", "KARNS", "KAROO", "KAROS", "KARRI", "KARST", "KARSY", "KARTS", "KARZY", "KASHA", "KASME", "KATAL", "KATAS", "KATIS", "KATTI", "KAUGH", "KAURI", "KAURU", "KAURY", "KAVAL", "KAVAS", "KAWAS", "KAWAU", "KAWED", "KAYLE", "KAYOS", "KAZIS", "KAZOO", "KBARS", "KEBAR", "KEBOB", "KECKS", "KEDGE", "KEDGY", "KEECH", "KEEFS", "KEEKS", "KEELS", "KEEMA", "KEENO", "KEENS", "KEEPS", "KEETS", "KEEVE", "KEFIR", "KEHUA", "KEIRS", "KELEP", "KELIM", "KELLS", "KELLY", "KELPS", "KELPY", "KELTS", "KELTY", "KEMBO", "KEMBS", "KEMPS", "KEMPT", "KEMPY", "KENAF", "KENCH", "KENDO", "KENOS", "KENTE", "KENTS", "KEPIS", "KERBS", "KEREL", "KERFS", "KERKY", "KERMA", "KERNE", "KERNS", "KEROS", "KERRY", "KERVE", "KESAR", "KESTS", "KETAS", "KETCH", "KETES", "KETOL", "KEVEL", "KEVIL", "KEXES", "KEYED", "KEYER", "KHADI", "KHAFS", "KHANS", "KHAPH", "KHATS", "KHAYA", "KHAZI", "KHEDA", "KHETH", "KHETS", "KHOJA", "KHORS", "KHOUM", "KHUDS", "KIAAT", "KIACK", "KIANG", "KIBBE", "KIBBI", "KIBEI", "KIBES", "KIBLA", "KICKS", "KICKY", "KIDDO", "KIDDY", "KIDEL", "KIDGE", "KIEFS", "KIERS", "KIEVE", "KIEVS", "KIGHT", "KIKES", "KIKOI", "KILEY", "KILIM", "KILLS", "KILNS", "KILOS", "KILPS", "KILTS", "KILTY", "KIMBO", "KINAS", "KINDA", "KINDS", "KINDY", "KINES", "KINGS", "KININ", "KINKS", "KINOS", "KIORE", "KIPES", "KIPPA", "KIPPS", "KIRBY", "KIRKS", "KIRNS", "KIRRI", "KISAN", "KISSY", "KISTS", "KITED", "KITER", "KITES", "KITHE", "KITHS", "KITUL", "KIVAS", "KIWIS", "KLANG", "KLAPS", "KLETT", "KLICK", "KLIEG", "KLIKS", "KLONG", "KLOOF", "KLUGE", "KLUTZ", "KNAGS", "KNAPS", "KNARL", "KNARS", "KNAUR", "KNAWE", "KNEES", "KNELL", "KNISH", "KNITS", "KNIVE", "KNOBS", "KNOPS", "KNOSP", "KNOTS", "KNOUT", "KNOWE", "KNOWS", "KNUBS", "KNURL", "KNURR", "KNURS", "KNUTS", "KOANS", "KOAPS", "KOBAN", "KOBOS", "KOELS", "KOFFS", "KOFTA", "KOGAL", "KOHAS", "KOHEN", "KOHLS", "KOINE", "KOJIS", "KOKAM", "KOKAS", "KOKER", "KOKRA", "KOKUM", "KOLAS", "KOLOS", "KOMBU", "KONBU", "KONDO", "KONKS", "KOOKS", "KOOKY", "KOORI", "KOPEK", "KOPHS", "KOPJE", "KOPPA", "KORAI", "KORAN", "KORAS", "KORAT", "KORES", "KORMA", "KOROS", "KORUN", "KORUS", "KOSES", "KOTCH", "KOTOS", "KOTOW", "KOURA", "KRAAL", "KRABS", "KRAFT", "KRAIS", "KRAIT", "KRANG", "KRANS", "KRANZ", "KRAUT", "KRAYS", "KREEP", "KRENG", "KREWE", "KRONA", "KRONE", "KROON", "KRUBI", "KRUNK", "KSARS", "KUBIE", "KUDOS", "KUDUS", "KUDZU", "KUFIS", "KUGEL", "KUIAS", "KUKRI", "KUKUS", "KULAK", "KULAN", "KULAS", "KULFI", "KUMIS", "KUMYS", "KURIS", "KURRE", "KURTA", "KURUS", "KUSSO", "KUTAS", "KUTCH", "KUTIS", "KUTUS", "KUZUS", "KVASS", "KVELL", "KWELA", "KYACK", "KYAKS", "KYANG", "KYARS", "KYATS", "KYBOS", "KYDST", "KYLES", "KYLIE", "KYLIN", "KYLIX", "KYLOE", "KYNDE", "KYNDS", "KYPES", "KYRIE", "KYTES", "KYTHE", "LAARI", "LABDA", "LABIA", "LABIS", "LABRA", "LACED", "LACER", "LACES", "LACET", "LACEY", "LACKS", "LADDY", "LADED", "LADER", "LADES", "LAERS", "LAEVO", "LAGAN", "LAHAL", "LAHAR", "LAICH", "LAICS", "LAIDS", "LAIGH", "LAIKA", "LAIKS", "LAIRD", "LAIRS", "LAIRY", "LAITH", "LAITY", "LAKED", "LAKER", "LAKES", "LAKHS", "LAKIN", "LAKSA", "LALDY", "LALLS", "LAMAS", "LAMBS", "LAMBY", "LAMED", "LAMER", "LAMES", "LAMIA", "LAMMY", "LAMPS", "LANAI", "LANAS", "LANCH", "LANDE", "LANDS", "LANES", "LANKS", "LANTS", "LAPIN", "LAPIS", "LAPJE", "LARCH", "LARDS", "LARDY", "LAREE", "LARES", "LARGO", "LARIS", "LARKS", "LARKY", "LARNS", "LARNT", "LARUM", "LASED", "LASER", "LASES", "LASSI", "LASSU", "LASSY", "LASTS", "LATAH", "LATED", "LATEN", "LATEX", "LATHI", "LATHS", "LATHY", "LATKE", "LATUS", "LAUAN", "LAUCH", "LAUDS", "LAUFS", "LAUND", "LAURA", "LAVAL", "LAVAS", "LAVED", "LAVER", "LAVES", "LAVRA", "LAVVY", "LAWED", "LAWER", "LAWIN", "LAWKS", "LAWNS", "LAWNY", "LAXED", "LAXER", "LAXES", "LAXLY", "LAYED", "LAYIN", "LAYUP", "LAZAR", "LAZED", "LAZES", "LAZOS", "LAZZI", "LAZZO", "LEADS", "LEADY", "LEAFS", "LEAKS", "LEAMS", "LEANS", "LEANY", "LEAPS", "LEARE", "LEARS", "LEARY", "LEATS", "LEAVY", "LEAZE", "LEBEN", "LECCY", "LEDES", "LEDGY", "LEDUM", "LEEAR", "LEEKS", "LEEPS", "LEERS", "LEESE", "LEETS", "LEEZE", "LEFTE", "LEFTS", "LEGER", "LEGES", "LEGGE", "LEGGO", "LEGIT", "LEHRS", "LEHUA", "LEIRS", "LEISH", "LEMAN", "LEMED", "LEMEL", "LEMES", "LEMMA", "LEMME", "LENDS", "LENES", "LENGS", "LENIS", "LENOS", "LENSE", "LENTI", "LENTO", "LEONE", "LEPID", "LEPRA", "LEPTA", "LERED", "LERES", "LERPS", "LESBO", "LESES", "LESTS", "LETCH", "LETHE", "LETUP", "LEUCH", "LEUCO", "LEUDS", "LEUGH", "LEVAS", "LEVEE", "LEVES", "LEVIN", "LEVIS", "LEWIS", "LEXES", "LEXIS", "LEZES", "LEZZA", "LEZZY", "LIANA", "LIANE", "LIANG", "LIARD", "LIARS", "LIART", "LIBER", "LIBRA", "LIBRI", "LICHI", "LICHT", "LICIT", "LICKS", "LIDAR", "LIDOS", "LIEFS", "LIENS", "LIERS", "LIEUS", "LIEVE", "LIFER", "LIFES", "LIFTS", "LIGAN", "LIGER", "LIGGE", "LIGNE", "LIKED", "LIKER", "LIKES", "LIKIN", "LILLS", "LILOS", "LILTS", "LIMAN", "LIMAS", "LIMAX", "LIMBA", "LIMBI", "LIMBS", "LIMBY", "LIMED", "LIMEN", "LIMES", "LIMEY", "LIMMA", "LIMNS", "LIMOS", "LIMPA", "LIMPS", "LINAC", "LINCH", "LINDS", "LINDY", "LINED", "LINES", "LINEY", "LINGA", "LINGS", "LINGY", "LININ", "LINKS", "LINKY", "LINNS", "LINNY", "LINOS", "LINTS", "LINTY", "LINUM", "LINUX", "LIONS", "LIPAS", "LIPES", "LIPIN", "LIPOS", "LIPPY", "LIRAS", "LIRKS", "LIROT", "LISKS", "LISLE", "LISPS", "LISTS", "LITAI", "LITAS", "LITED", "LITER", "LITES", "LITHO", "LITHS", "LITRE", "LIVED", "LIVEN", "LIVES", "LIVOR", "LIVRE", "LLANO", "LOACH", "LOADS", "LOAFS", "LOAMS", "LOANS", "LOAST", "LOAVE", "LOBAR", "LOBED", "LOBES", "LOBOS", "LOBUS", "LOCHE", "LOCHS", "LOCIE", "LOCIS", "LOCKS", "LOCOS", "LOCUM", "LODEN", "LODES", "LOESS", "LOFTS", "LOGAN", "LOGES", "LOGGY", "LOGIA", "LOGIE", "LOGOI", "LOGON", "LOGOS", "LOHAN", "LOIDS", "LOINS", "LOIPE", "LOIRS", "LOKES", "LOLLS", "LOLLY", "LOLOG", "LOMAS", "LOMED", "LOMES", "LONER", "LONGA", "LONGE", "LONGS", "LOOBY", "LOOED", "LOOEY", "LOOFA", "LOOFS", "LOOIE", "LOOKS", "LOOKY", "LOOMS", "LOONS", "LOONY", "LOOPS", "LOORD", "LOOTS", "LOPED", "LOPER", "LOPES", "LOPPY", "LORAL", "LORAN", "LORDS", "LORDY", "LOREL", "LORES", "LORIC", "LORIS", "LOSED", "LOSEL", "LOSEN", "LOSES", "LOSSY", "LOTAH", "LOTAS", "LOTES", "LOTIC", "LOTOS", "LOTSA", "LOTTA", "LOTTE", "LOTTO", "LOTUS", "LOUED", "LOUGH", "LOUIE", "LOUIS", "LOUMA", "LOUND", "LOUNS", "LOUPE", "LOUPS", "LOURE", "LOURS", "LOURY", "LOUTS", "LOVAT", "LOVED", "LOVES", "LOVEY", "LOVIE", "LOWAN", "LOWED", "LOWES", "LOWND", "LOWNE", "LOWNS", "LOWPS", "LOWRY", "LOWSE", "LOWTS", "LOXED", "LOXES", "LOZEN", "LUACH", "LUAUS", "LUBED", "LUBES", "LUBRA", "LUCES", "LUCKS", "LUCRE", "LUDES", "LUDIC", "LUDOS", "LUFFA", "LUFFS", "LUGED", "LUGER", "LUGES", "LULLS", "LULUS", "LUMAS", "LUMBI", "LUMME", "LUMMY", "LUMPS", "LUNAS", "LUNES", "LUNET", "LUNGI", "LUNGS", "LUNKS", "LUNTS", "LUPIN", "LURED", "LURER", "LURES", "LUREX", "LURGI", "LURGY", "LURKS", "LURRY", "LURVE", "LUSER", "LUSHY", "LUSKS", "LUSTS", "LUSUS", "LUTEA", "LUTED", "LUTER", "LUTES", "LUVVY", "LUXED", "LUXER", "LUXES", "LWEIS", "LYAMS", "LYARD", "LYART", "LYASE", "LYCEA", "LYCEE", "LYCRA", "LYMES", "LYNCH", "LYNES", "LYRES", "LYSED", "LYSES", "LYSIN", "LYSIS", "LYSOL", "LYSSA", "LYTED", "LYTES", "LYTHE", "LYTIC", "LYTTA", "MAAED", "MAARE", "MAARS", "MABES", "MACAS", "MACED", "MACER", "MACES", "MACHE", "MACHI", "MACHS", "MACKS", "MACLE", "MACON", "MADGE", "MADID", "MADRE", "MAERL", "MAFIC", "MAGES", "MAGGS", "MAGOT", "MAGUS", "MAHOE", "MAHUA", "MAHWA", "MAIDS", "MAIKO", "MAIKS", "MAILE", "MAILL", "MAILS", "MAIMS", "MAINS", "MAIRE", "MAIRS", "MAISE", "MAIST", "MAKAR", "MAKES", "MAKIS", "MAKOS", "MALAM", "MALAR", "MALAS", "MALAX", "MALES", "MALIC", "MALIK", "MALIS", "MALLS", "MALMS", "MALMY", "MALTS", "MALTY", "MALUS", "MALVA", "MALWA", "MAMAS", "MAMBA", "MAMEE", "MAMEY", "MAMIE", "MANAS", "MANAT", "MANDI", "MANEB", "MANED", "MANEH", "MANES", "MANET", "MANGS", "MANIS", "MANKY", "MANNA", "MANOS", "MANSE", "MANTA", "MANTO", "MANTY", "MANUL", "MANUS", "MAPAU", "MAQUI", "MARAE", "MARAH", "MARAS", "MARCS", "MARDY", "MARES", "MARGE", "MARGS", "MARIA", "MARID", "MARKA", "MARKS", "MARLE", "MARLS", "MARLY", "MARMS", "MARON", "MAROR", "MARRA", "MARRI", "MARSE", "MARTS", "MARVY", "MASAS", "MASED", "MASER", "MASES", "MASHY", "MASKS", "MASSA", "MASSY", "MASTS", "MASTY", "MASUS", "MATAI", "MATED", "MATER", "MATES", "MATHS", "MATIN", "MATLO", "MATTE", "MATTS", "MATZA", "MATZO", "MAUBY", "MAUDS", "MAULS", "MAUND", "MAURI", "MAUSY", "MAUTS", "MAUZY", "MAVEN", "MAVIE", "MAVIN", "MAVIS", "MAWED", "MAWKS", "MAWKY", "MAWNS", "MAWRS", "MAXED", "MAXES", "MAXIS", "MAYAN", "MAYAS", "MAYED", "MAYOS", "MAYST", "MAZED", "MAZER", "MAZES", "MAZEY", "MAZUT", "MBIRA", "MEADS", "MEALS", "MEANE", "MEANS", "MEANY", "MEARE", "MEASE", "MEATH", "MEATS", "MEBOS", "MECHS", "MECKS", "MEDII", "MEDLE", "MEEDS", "MEERS", "MEETS", "MEFFS", "MEINS", "MEINT", "MEINY", "MEITH", "MEKKA", "MELAS", "MELBA", "MELDS", "MELIC", "MELIK", "MELLS", "MELTS", "MELTY", "MEMES", "MEMOS", "MENAD", "MENDS", "MENED", "MENES", "MENGE", "MENGS", "MENSA", "MENSE", "MENSH", "MENTA", "MENTO", "MENUS", "MEOUS", "MEOWS", "MERCH", "MERCS", "MERDE", "MERED", "MEREL", "MERER", "MERES", "MERIL", "MERIS", "MERKS", "MERLE", "MERLS", "MERSE", "MESAL", "MESAS", "MESEL", "MESES", "MESHY", "MESIC", "MESNE", "MESON", "MESSY", "MESTO", "METED", "METES", "METHO", "METHS", "METIC", "METIF", "METIS", "METOL", "METRE", "MEUSE", "MEVED", "MEVES", "MEWED", "MEWLS", "MEYNT", "MEZES", "MEZZE", "MEZZO", "MHORR", "MIAOU", "MIAOW", "MIASM", "MIAUL", "MICAS", "MICHE", "MICHT", "MICKS", "MICKY", "MICOS", "MICRA", "MIDDY", "MIDGY", "MIDIS", "MIENS", "MIEVE", "MIFFS", "MIFFY", "MIFTY", "MIGGS", "MIHAS", "MIHIS", "MIKED", "MIKES", "MIKRA", "MIKVA", "MILCH", "MILDS", "MILER", "MILES", "MILFS", "MILIA", "MILKO", "MILKS", "MILLE", "MILLS", "MILOR", "MILOS", "MILPA", "MILTS", "MILTY", "MILTZ", "MIMED", "MIMEO", "MIMER", "MIMES", "MIMSY", "MINAE", "MINAR", "MINAS", "MINCY", "MINDS", "MINED", "MINES", "MINGE", "MINGS", "MINGY", "MINIS", "MINKE", "MINKS", "MINNY", "MINOS", "MINTS", "MIRED", "MIRES", "MIREX", "MIRID", "MIRIN", "MIRKS", "MIRKY", "MIRLY", "MIROS", "MIRVS", "MIRZA", "MISCH", "MISDO", "MISES", "MISGO", "MISOS", "MISSA", "MISTS", "MISTY", "MITCH", "MITER", "MITES", "MITIS", "MITRE", "MITTS", "MIXED", "MIXEN", "MIXER", "MIXES", "MIXTE", "MIXUP", "MIZEN", "MIZZY", "MNEME", "MOANS", "MOATS", "MOBBY", "MOBES", "MOBEY", "MOBIE", "MOBLE", "MOCHI", "MOCHS", "MOCHY", "MOCKS", "MODER", "MODES", "MODGE", "MODII", "MODUS", "MOERS", "MOFOS", "MOGGY", "MOHEL", "MOHOS", "MOHRS", "MOHUA", "MOHUR", "MOILE", "MOILS", "MOIRA", "MOIRE", "MOITS", "MOJOS", "MOKES", "MOKIS", "MOKOS", "MOLAL", "MOLAS", "MOLDS", "MOLED", "MOLES", "MOLLA", "MOLLS", "MOLLY", "MOLTO", "MOLTS", "MOLYS", "MOMES", "MOMMA", "MOMMY", "MOMUS", "MONAD", "MONAL", "MONAS", "MONDE", "MONDO", "MONER", "MONGO", "MONGS", "MONIC", "MONIE", "MONKS", "MONOS", "MONTE", "MONTY", "MOOBS", "MOOCH", "MOODS", "MOOED", "MOOKS", "MOOLA", "MOOLI", "MOOLS", "MOOLY", "MOONG", "MOONS", "MOONY", "MOOPS", "MOORS", "MOORY", "MOOTS", "MOOVE", "MOPED", "MOPER", "MOPES", "MOPEY", "MOPPY", "MOPSY", "MOPUS", "MORAE", "MORAS", "MORAT", "MORAY", "MOREL", "MORES", "MORIA", "MORNE", "MORNS", "MORRA", "MORRO", "MORSE", "MORTS", "MOSED", "MOSES", "MOSEY", "MOSKS", "MOSSO", "MOSTE", "MOSTS", "MOTED", "MOTEN", "MOTES", "MOTET", "MOTEY", "MOTHS", "MOTHY", "MOTIS", "MOTTE", "MOTTS", "MOTTY", "MOTUS", "MOTZA", "MOUCH", "MOUES", "MOULD", "MOULS", "MOUPS", "MOUST", "MOUSY", "MOVED", "MOVES", "MOWAS", "MOWED", "MOWRA", "MOXAS", "MOXIE", "MOYAS", "MOYLE", "MOYLS", "MOZED", "MOZES", "MOZOS", "MPRET", "MUCHO", "MUCIC", "MUCID", "MUCIN", "MUCKS", "MUCOR", "MUCRO", "MUDGE", "MUDIR", "MUDRA", "MUFFS", "MUFTI", "MUGGA", "MUGGS", "MUGGY", "MUHLY", "MUIDS", "MUILS", "MUIRS", "MUIST", "MUJIK", "MULCT", "MULED", "MULES", "MULEY", "MULGA", "MULIE", "MULLA", "MULLS", "MULSE", "MULSH", "MUMMS", "MUMPS", "MUMSY", "MUMUS", "MUNGA", "MUNGE", "MUNGO", "MUNGS", "MUNIS", "MUNTS", "MUNTU", "MUONS", "MURAS", "MURED", "MURES", "MUREX", "MURID", "MURKS", "MURLS", "MURLY", "MURRA", "MURRE", "MURRI", "MURRS", "MURRY", "MURTI", "MURVA", "MUSAR", "MUSCA", "MUSED", "MUSER", "MUSES", "MUSET", "MUSHA", "MUSIT", "MUSKS", "MUSOS", "MUSSE", "MUSSY", "MUSTH", "MUSTS", "MUTCH", "MUTED", "MUTER", "MUTES", "MUTHA", "MUTIS", "MUTON", "MUTTS", "MUXED", "MUXES", "MUZAK", "MUZZY", "MVULE", "MYALL", "MYLAR", "MYNAH", "MYNAS", "MYOID", "MYOMA", "MYOPE", "MYOPS", "MYOPY", "MYSID", "MYTHI", "MYTHS", "MYTHY", "MYXOS", "MZEES", "NAAMS", "NAANS", "NABES", "NABIS", "NABKS", "NABLA", "NABOB", "NACHE", "NACHO", "NACRE", "NADAS", "NAEVE", "NAEVI", "NAFFS", "NAGAS", "NAGGY", "NAGOR", "NAHAL", "NAIAD", "NAIFS", "NAIKS", "NAILS", "NAIRA", "NAIRU", "NAKED", "NAKER", "NAKFA", "NALAS", "NALED", "NALLA", "NAMED", "NAMER", "NAMES", "NAMMA", "NAMUS", "NANAS", "NANCE", "NANCY", "NANDU", "NANNA", "NANOS", "NANUA", "NAPAS", "NAPED", "NAPES", "NAPOO", "NAPPA", "NAPPE", "NAPPY", "NARAS", "NARCO", "NARCS", "NARDS", "NARES", "NARIC", "NARIS", "NARKS", "NARKY", "NARRE", "NASHI", "NATCH", "NATES", "NATIS", "NATTY", "NAUCH", "NAUNT", "NAVAR", "NAVES", "NAVEW", "NAVVY", "NAWAB", "NAZES", "NAZIR", "NAZIS", "NDUJA", "NEAFE", "NEALS", "NEAPS", "NEARS", "NEATH", "NEATS", "NEBEK", "NEBEL", "NECKS", "NEDDY", "NEEDS", "NEELD", "NEELE", "NEEMB", "NEEMS", "NEEPS", "NEESE", "NEEZE", "NEGRO", "NEGUS", "NEIFS", "NEIST", "NEIVE", "NELIS", "NELLY", "NEMAS", "NEMNS", "NEMPT", "NENES", "NEONS", "NEPER", "NEPIT", "NERAL", "NERDS", "NERKA", "NERKS", "NEROL", "NERTS", "NERTZ", "NERVY", "NESTS", "NETES", "NETOP", "NETTS", "NETTY", "NEUKS", "NEUME", "NEUMS", "NEVEL", "NEVES", "NEVUS", "NEWBS", "NEWED", "NEWEL", "NEWIE", "NEWSY", "NEWTS", "NEXTS", "NEXUS", "NGAIO", "NGANA", "NGATI", "NGOMA", "NGWEE", "NICAD", "NICHT", "NICKS", "NICOL", "NIDAL", "NIDED", "NIDES", "NIDOR", "NIDUS", "NIEFS", "NIEVE", "NIFES", "NIFFS", "NIFFY", "NIFTY", "NIGER", "NIGHS", "NIHIL", "NIKAB", "NIKAH", "NIKAU", "NILLS", "NIMBI", "NIMBS", "NIMPS", "NINER", "NINES", "NINON", "NIPAS", "NIPPY", "NIQAB", "NIRLS", "NIRLY", "NISEI", "NISSE", "NISUS", "NITER", "NITES", "NITID", "NITON", "NITRE", "NITRO", "NITRY", "NITTY", "NIVAL", "NIXED", "NIXER", "NIXES", "NIXIE", "NIZAM", "NKOSI", "NOAHS", "NOBBY", "NOCKS", "NODAL", "NODDY", "NODES", "NODUS", "NOELS", "NOGGS", "NOHOW", "NOILS", "NOILY", "NOINT", "NOIRS", "NOLES", "NOLLS", "NOLOS", "NOMAS", "NOMEN", "NOMES", "NOMIC", "NOMOI", "NOMOS", "NONAS", "NONCE", "NONES", "NONET", "NONGS", "NONIS", "NONNY", "NONYL", "NOOBS", "NOOIT", "NOOKS", "NOOKY", "NOONS", "NOOPS", "NOPAL", "NORIA", "NORIS", "NORKS", "NORMA", "NORMS", "NOSED", "NOSER", "NOSES", "NOTAL", "NOTED", "NOTER", "NOTES", "NOTUM", "NOULD", "NOULE", "NOULS", "NOUNS", "NOUNY", "NOUPS", "NOVAE", "NOVAS", "NOVUM", "NOWAY", "NOWED", "NOWLS", "NOWTS", "NOWTY", "NOXAL", "NOXES", "NOYAU", "NOYED", "NOYES", "NUBBY", "NUBIA", "NUCHA", "NUDDY", "NUDER", "NUDES", "NUDIE", "NUDZH", "NUFFS", "NUGAE", "NUKED", "NUKES", "NULLA", "NULLS", "NUMBS", "NUMEN", "NUMMY", "NUNNY", "NURDS", "NURDY", "NURLS", "NURRS", "NUTSO", "NUTSY", "NYAFF", "NYALA", "NYING", "NYSSA", "OAKED", "OAKER", "OAKUM", "OARED", "OASES", "OASIS", "OASTS", "OATEN", "OATER", "OATHS", "OAVES", "OBANG", "OBEAH", "OBELI", "OBEYS", "OBIAS", "OBIED", "OBIIT", "OBITS", "OBJET", "OBOES", "OBOLE", "OBOLI", "OBOLS", "OCCAM", "OCHER", "OCHES", "OCHRE", "OCHRY", "OCKER", "OCREA", "OCTAD", "OCTAN", "OCTAS", "OCTYL", "OCULI", "ODAHS", "ODALS", "ODEON", "ODEUM", "ODISM", "ODIST", "ODIUM", "ODORS", "ODOUR", "ODYLE", "ODYLS", "OFAYS", "OFFED", "OFFIE", "OFLAG", "OFTER", "OGAMS", "OGEED", "OGEES", "OGGIN", "OGHAM", "OGIVE", "OGLED", "OGLER", "OGLES", "OGMIC", "OGRES", "OHIAS", "OHING", "OHMIC", "OHONE", "OIDIA", "OILED", "OILER", "OINKS", "OINTS", "OJIME", "OKAPI", "OKAYS", "OKEHS", "OKRAS", "OKTAS", "OLDIE", "OLEIC", "OLEIN", "OLENT", "OLEOS", "OLEUM", "OLIOS", "OLLAS", "OLLAV", "OLLER", "OLLIE", "OLOGY", "OLPAE", "OLPES", "OMASA", "OMBER", "OMBUS", "OMENS", "OMERS", "OMITS", "OMLAH", "OMOVS", "OMRAH", "ONCER", "ONCES", "ONCET", "ONCUS", "ONELY", "ONERS", "ONERY", "ONIUM", "ONKUS", "ONLAY", "ONNED", "ONTIC", "OOBIT", "OOHED", "OOMPH", "OONTS", "OOPED", "OORIE", "OOSES", "OOTID", "OOZED", "OOZES", "OPAHS", "OPALS", "OPENS", "OPEPE", "OPING", "OPPOS", "OPSIN", "OPTED", "OPTER", "ORACH", "ORACY", "ORALS", "ORANG", "ORANT", "ORATE", "ORBED", "ORCAS", "ORCIN", "ORDOS", "OREAD", "ORFES", "ORGIA", "ORGIC", "ORGUE", "ORIBI", "ORIEL", "ORIXA", "ORLES", "ORLON", "ORLOP", "ORMER", "ORNIS", "ORPIN", "ORRIS", "ORTHO", "ORVAL", "ORZOS", "OSCAR", "OSHAC", "OSIER", "OSMIC", "OSMOL", "OSSIA", "OSTIA", "OTAKU", "OTARY", "OTTAR", "OTTOS", "OUBIT", "OUCHT", "OUENS", "OUIJA", "OULKS", "OUMAS", "OUNDY", "OUPAS", "OUPED", "OUPHE", "OUPHS", "OURIE", "OUSEL", "OUSTS", "OUTBY", "OUTED", "OUTRE", "OUTRO", "OUTTA", "OUZEL", "OUZOS", "OVALS", "OVELS", "OVENS", "OVERS", "OVIST", "OVOLI", "OVOLO", "OVULE", "OWCHE", "OWIES", "OWLED", "OWLER", "OWLET", "OWNED", "OWRES", "OWRIE", "OWSEN", "OXBOW", "OXERS", "OXEYE", "OXIDS", "OXIES", "OXIME", "OXIMS", "OXLIP", "OXTER", "OYERS", "OZEKI", "OZZIE", "PAALS", "PAANS", "PACAS", "PACED", "PACER", "PACES", "PACEY", "PACHA", "PACKS", "PACOS", "PACTA", "PACTS", "PADIS", "PADLE", "PADMA", "PADRE", "PADRI", "PAEAN", "PAEDO", "PAEON", "PAGED", "PAGER", "PAGES", "PAGLE", "PAGOD", "PAGRI", "PAIKS", "PAILS", "PAINS", "PAIRE", "PAIRS", "PAISA", "PAISE", "PAKKA", "PALAS", "PALAY", "PALEA", "PALED", "PALES", "PALET", "PALIS", "PALKI", "PALLA", "PALLS", "PALLY", "PALMS", "PALMY", "PALPI", "PALPS", "PALSA", "PAMPA", "PANAX", "PANCE", "PANDA", "PANDS", "PANDY", "PANED", "PANES", "PANGA", "PANGS", "PANIM", "PANKO", "PANNE", "PANNI", "PANTO", "PANTS", "PANTY", "PAOLI", "PAOLO", "PAPAS", "PAPAW", "PAPES", "PAPPI", "PAPPY", "PARAE", "PARAS", "PARCH", "PARDI", "PARDS", "PARDY", "PARED", "PAREN", "PAREO", "PARES", "PAREU", "PAREV", "PARGE", "PARGO", "PARIS", "PARKI", "PARKS", "PARKY", "PARLE", "PARLY", "PARMA", "PAROL", "PARPS", "PARRA", "PARRS", "PARTI", "PARTS", "PARVE", "PARVO", "PASEO", "PASES", "PASHA", "PASHM", "PASKA", "PASPY", "PASSE", "PASTS", "PATED", "PATEN", "PATER", "PATES", "PATHS", "PATIN", "PATKA", "PATLY", "PATTE", "PATUS", "PAUAS", "PAULS", "PAVAN", "PAVED", "PAVEN", "PAVER", "PAVES", "PAVID", "PAVIN", "PAVIS", "PAWAS", "PAWAW", "PAWED", "PAWER", "PAWKS", "PAWKY", "PAWLS", "PAWNS", "PAXES", "PAYED", "PAYOR", "PAYSD", "PEAGE", "PEAGS", "PEAKS", "PEAKY", "PEALS", "PEANS", "PEARE", "PEARS", "PEART", "PEASE", "PEATS", "PEATY", "PEAVY", "PEAZE", "PEBAS", "PECHS", "PECKE", "PECKS", "PECKY", "PEDES", "PEDIS", "PEDRO", "PEECE", "PEEKS", "PEELS", "PEENS", "PEEOY", "PEEPE", "PEEPS", "PEERS", "PEERY", "PEEVE", "PEGGY", "PEGHS", "PEINS", "PEISE", "PEIZE", "PEKAN", "PEKES", "PEKIN", "PEKOE", "PELAS", "PELAU", "PELES", "PELFS", "PELLS", "PELMA", "PELON", "PELTA", "PELTS", "PENDS", "PENDU", "PENED", "PENES", "PENGO", "PENIE", "PENIS", "PENKS", "PENNA", "PENNI", "PENTS", "PEONS", "PEONY", "PEPLA", "PEPOS", "PEPPY", "PEPSI", "PERAI", "PERCE", "PERCS", "PERDU", "PERDY", "PEREA", "PERES", "PERIS", "PERKS", "PERMS", "PERNS", "PEROG", "PERPS", "PERRY", "PERSE", "PERST", "PERTS", "PERVE", "PERVO", "PERVS", "PERVY", "PESOS", "PESTS", "PESTY", "PETAR", "PETER", "PETIT", "PETRE", "PETRI", "PETTI", "PETTO", "PEWEE", "PEWIT", "PEYSE", "PHAGE", "PHANG", "PHARE", "PHARM", "PHEER", "PHENE", "PHEON", "PHESE", "PHIAL", "PHISH", "PHIZZ", "PHLOX", "PHOCA", "PHONO", "PHONS", "PHOTS", "PHPHT", "PHUTS", "PHYLA", "PHYLE", "PIANI", "PIANS", "PIBAL", "PICAL", "PICAS", "PICCY", "PICKS", "PICOT", "PICRA", "PICUL", "PIEND", "PIERS", "PIERT", "PIETA", "PIETS", "PIEZO", "PIGHT", "PIGMY", "PIING", "PIKAS", "PIKAU", "PIKED", "PIKER", "PIKES", "PIKEY", "PIKIS", "PIKUL", "PILAE", "PILAF", "PILAO", "PILAR", "PILAU", "PILAW", "PILCH", "PILEA", "PILED", "PILEI", "PILER", "PILES", "PILIS", "PILLS", "PILOW", "PILUM", "PILUS", "PIMAS", "PIMPS", "PINAS", "PINED", "PINES", "PINGO", "PINGS", "PINKO", "PINKS", "PINNA", "PINNY", "PINON", "PINOT", "PINTA", "PINTS", "PINUP", "PIONS", "PIONY", "PIOUS", "PIOYE", "PIOYS", "PIPAL", "PIPAS", "PIPED", "PIPES", "PIPET", "PIPIS", "PIPIT", "PIPPY", "PIPUL", "PIRAI", "PIRLS", "PIRNS", "PIROG", "PISCO", "PISES", "PISKY", "PISOS", "PISSY", "PISTE", "PITAS", "PITHS", "PITON", "PITOT", "PITTA", "PIUMS", "PIXES", "PIZED", "PIZES", "PLAAS", "PLACK", "PLAGE", "PLANS", "PLAPS", "PLASH", "PLASM", "PLAST", "PLATS", "PLATT", "PLATY", "PLAYA", "PLAYS", "PLEAS", "PLEBE", "PLEBS", "PLENA", "PLEON", "PLESH", "PLEWS", "PLICA", "PLIES", "PLIMS", "PLING", "PLINK", "PLOAT", "PLODS", "PLONG", "PLONK", "PLOOK", "PLOPS", "PLOTS", "PLOTZ", "PLOUK", "PLOWS", "PLOYE", "PLOYS", "PLUES", "PLUFF", "PLUGS", "PLUMS", "PLUMY", "PLUOT", "PLUTO", "PLYER", "POACH", "POAKA", "POAKE", "POBOY", "POCKS", "POCKY", "PODAL", "PODDY", "PODEX", "PODGE", "PODGY", "PODIA", "POEMS", "POEPS", "POETS", "POGEY", "POGGE", "POGOS", "POHED", "POILU", "POIND", "POKAL", "POKED", "POKES", "POKEY", "POKIE", "POLED", "POLER", "POLES", "POLEY", "POLIO", "POLIS", "POLJE", "POLKS", "POLLS", "POLLY", "POLOS", "POLTS", "POLYS", "POMBE", "POMES", "POMMY", "POMOS", "POMPS", "PONCE", "PONCY", "PONDS", "PONES", "PONEY", "PONGA", "PONGO", "PONGS", "PONGY", "PONKS", "PONTS", "PONTY", "PONZU", "POODS", "POOED", "POOFS", "POOFY", "POOHS", "POOJA", "POOKA", "POOKS", "POOLS", "POONS", "POOPS", "POOPY", "POORI", "POORT", "POOTS", "POOVE", "POOVY", "POPES", "POPPA", "POPSY", "PORAE", "PORAL", "PORED", "PORER", "PORES", "PORGE", "PORGY", "PORIN", "PORKS", "PORKY", "PORNO", "PORNS", "PORNY", "PORTA", "PORTS", "PORTY", "POSED", "POSES", "POSEY", "POSHO", "POSTS", "POTAE", "POTCH", "POTED", "POTES", "POTIN", "POTOO", "POTSY", "POTTO", "POTTS", "POTTY", "POUFF", "POUFS", "POUKE", "POUKS", "POULE", "POULP", "POULT", "POUPE", "POUPT", "POURS", "POUTS", "POWAN", "POWIN", "POWND", "POWNS", "POWNY", "POWRE", "POXED", "POXES", "POYNT", "POYOU", "POYSE", "POZZY", "PRAAM", "PRADS", "PRAHU", "PRAMS", "PRANA", "PRANG", "PRAOS", "PRASE", "PRATE", "PRATS", "PRATT", "PRATY", "PRAUS", "PRAYS", "PREDY", "PREED", "PREES", "PREIF", "PREMS", "PREMY", "PRENT", "PREON", "PREOP", "PREPS", "PRESA", "PRESE", "PREST", "PREVE", "PREXY", "PREYS", "PRIAL", "PRICY", "PRIEF", "PRIER", "PRIES", "PRIGS", "PRILL", "PRIMA", "PRIMI", "PRIMP", "PRIMS", "PRIMY", "PRINK", "PRION", "PRISE", "PRISS", "PROAS", "PROBS", "PRODS", "PROEM", "PROFS", "PROGS", "PROIN", "PROKE", "PROLE", "PROLL", "PROMO", "PROMS", "PRONK", "PROPS", "PRORE", "PROSO", "PROSS", "PROST", "PROSY", "PROTO", "PROUL", "PROWS", "PROYN", "PRUNT", "PRUTA", "PRYER", "PRYSE", "PSEUD", "PSHAW", "PSION", "PSOAE", "PSOAI", "PSOAS", "PSORA", "PSYCH", "PSYOP", "PUBCO", "PUBES", "PUBIS", "PUCAN", "PUCER", "PUCES", "PUCKA", "PUCKS", "PUDDY", "PUDGE", "PUDIC", "PUDOR", "PUDSY", "PUDUS", "PUERS", "PUFFA", "PUFFS", "PUGGY", "PUGIL", "PUHAS", "PUJAH", "PUJAS", "PUKAS", "PUKED", "PUKER", "PUKES", "PUKEY", "PUKKA", "PUKUS", "PULAO", "PULAS", "PULED", "PULER", "PULES", "PULIK", "PULIS", "PULKA", "PULKS", "PULLI", "PULLS", "PULLY", "PULMO", "PULPS", "PULUS", "PUMAS", "PUMIE", "PUMPS", "PUNAS", "PUNCE", "PUNGA", "PUNGS", "PUNJI", "PUNKA", "PUNKS", "PUNKY", "PUNNY", "PUNTO", "PUNTS", "PUNTY", "PUPAE", "PUPAL", "PUPAS", "PUPUS", "PURDA", "PURED", "PURES", "PURIN", "PURIS", "PURLS", "PURPY", "PURRS", "PURSY", "PURTY", "PUSES", "PUSLE", "PUSSY", "PUTID", "PUTON", "PUTTI", "PUTTO", "PUTTS", "PUZEL", "PWNED", "PYATS", "PYETS", "PYGAL", "PYINS", "PYLON", "PYNED", "PYNES", "PYOID", "PYOTS", "PYRAL", "PYRAN", "PYRES", "PYREX", "PYRIC", "PYROS", "PYXED", "PYXES", "PYXIE", "PYXIS", "PZAZZ", "QADIS", "QAIDS", "QAJAQ", "QANAT", "QAPIK", "QIBLA", "QOPHS", "QORMA", "QUADS", "QUAFF", "QUAGS", "QUAIR", "QUAIS", "QUAKY", "QUALE", "QUANT", "QUARE", "QUASS", "QUATE", "QUATS", "QUAYD", "QUAYS", "QUBIT", "QUEAN", "QUEME", "QUENA", "QUERN", "QUEYN", "QUEYS", "QUICH", "QUIDS", "QUIFF", "QUIMS", "QUINA", "QUINE", "QUINO", "QUINS", "QUINT", "QUIPO", "QUIPS", "QUIPU", "QUIRE", "QUIRT", "QUIST", "QUITS", "QUOAD", "QUODS", "QUOIF", "QUOIN", "QUOIT", "QUOLL", "QUONK", "QUOPS", "QURAN", "QURSH", "QUYTE", "RABAT", "RABIC", "RABIS", "RACED", "RACES", "RACHE", "RACKS", "RACON", "RADGE", "RADIX", "RADON", "RAFFS", "RAFTS", "RAGAS", "RAGDE", "RAGED", "RAGEE", "RAGER", "RAGES", "RAGGA", "RAGGS", "RAGGY", "RAGIS", "RAGUS", "RAHED", "RAHUI", "RAIAS", "RAIDS", "RAIKS", "RAILE", "RAILS", "RAINE", "RAINS", "RAIRD", "RAITA", "RAITS", "RAJAS", "RAJES", "RAKED", "RAKEE", "RAKER", "RAKES", "RAKIA", "RAKIS", "RAKUS", "RALES", "RAMAL", "RAMEE", "RAMET", "RAMIE", "RAMIN", "RAMIS", "RAMMY", "RAMPS", "RAMUS", "RANAS", "RANCE", "RANDS", "RANEE", "RANGA", "RANGI", "RANGS", "RANGY", "RANID", "RANIS", "RANKE", "RANKS", "RANTS", "RAPED", "RAPER", "RAPES", "RAPHE", "RAPPE", "RARED", "RAREE", "RARES", "RARKS", "RASED", "RASER", "RASES", "RASPS", "RASSE", "RASTA", "RATAL", "RATAN", "RATAS", "RATCH", "RATED", "RATEL", "RATER", "RATES", "RATHA", "RATHE", "RATHS", "RATOO", "RATOS", "RATUS", "RAUNS", "RAUPO", "RAVED", "RAVEL", "RAVER", "RAVES", "RAVEY", "RAVIN", "RAWER", "RAWIN", "RAWLY", "RAWNS", "RAXED", "RAXES", "RAYAH", "RAYAS", "RAYED", "RAYLE", "RAYNE", "RAZED", "RAZEE", "RAZER", "RAZES", "RAZOO", "READD", "READS", "REAIS", "REAKS", "REALO", "REALS", "REAME", "REAMS", "REAMY", "REANS", "REAPS", "REARS", "REAST", "REATA", "REATE", "REAVE", "REBBE", "REBEC", "REBID", "REBIT", "REBOP", "REBUY", "RECAL", "RECCE", "RECCO", "RECCY", "RECIT", "RECKS", "RECON", "RECTA", "RECTI", "RECTO", "REDAN", "REDDS", "REDDY", "REDED", "REDES", "REDIA", "REDID", "REDIP", "REDLY", "REDON", "REDOS", "REDOX", "REDRY", "REDUB", "REDUX", "REDYE", "REECH", "REEDE", "REEDS", "REEFS", "REEFY", "REEKS", "REEKY", "REELS", "REENS", "REEST", "REEVE", "REFED", "REFEL", "REFFO", "REFIS", "REFIX", "REFLY", "REFRY", "REGAR", "REGES", "REGGO", "REGIE", "REGMA", "REGNA", "REGOS", "REGUR", "REHEM", "REIFS", "REIFY", "REIKI", "REIKS", "REINK", "REINS", "REIRD", "REIST", "REIVE", "REJIG", "REJON", "REKED", "REKES", "REKEY", "RELET", "RELIE", "RELIT", "RELLO", "REMAN", "REMAP", "REMEN", "REMET", "REMEX", "REMIX", "RENAY", "RENDS", "RENEY", "RENGA", "RENIG", "RENIN", "RENNE", "RENOS", "RENTE", "RENTS", "REOIL", "REORG", "REPEG", "REPIN", "REPLA", "REPOS", "REPOT", "REPPS", "REPRO", "RERAN", "RERIG", "RESAT", "RESAW", "RESAY", "RESEE", "RESES", "RESEW", "RESID", "RESIT", "RESOD", "RESOW", "RESTO", "RESTS", "RESTY", "RESUS", "RETAG", "RETAX", "RETEM", "RETIA", "RETIE", "RETOX", "REVET", "REVIE", "REWAN", "REWAX", "REWED", "REWET", "REWIN", "REWON", "REWTH", "REXES", "REZES", "RHEAS", "RHEME", "RHEUM", "RHIES", "RHIME", "RHINE", "RHODY", "RHOMB", "RHONE", "RHUMB", "RHYNE", "RHYTA", "RIADS", "RIALS", "RIANT", "RIATA", "RIBAS", "RIBBY", "RIBES", "RICED", "RICER", "RICES", "RICEY", "RICHT", "RICIN", "RICKS", "RIDES", "RIDGY", "RIDIC", "RIELS", "RIEMS", "RIEVE", "RIFER", "RIFFS", "RIFTE", "RIFTS", "RIFTY", "RIGGS", "RIGOL", "RILED", "RILES", "RILEY", "RILLE", "RILLS", "RIMAE", "RIMED", "RIMER", "RIMES", "RIMUS", "RINDS", "RINDY", "RINES", "RINGS", "RINKS", "RIOJA", "RIOTS", "RIPED", "RIPES", "RIPPS", "RISES", "RISHI", "RISKS", "RISPS", "RISUS", "RITES", "RITTS", "RITZY", "RIVAS", "RIVED", "RIVEL", "RIVEN", "RIVES", "RIYAL", "RIZAS", "ROADS", "ROAMS", "ROANS", "ROARS", "ROARY", "ROATE", "ROBED", "ROBES", "ROBLE", "ROCKS", "RODED", "RODES", "ROGUY", "ROHES", "ROIDS", "ROILS", "ROILY", "ROINS", "ROIST", "ROJAK", "ROJIS", "ROKED", "ROKER", "ROKES", "ROLAG", "ROLES", "ROLFS", "ROLLS", "ROMAL", "ROMAN", "ROMEO", "ROMPS", "RONDE", "RONDO", "RONEO", "RONES", "RONIN", "RONNE", "RONTE", "RONTS", "ROODS", "ROOFS", "ROOFY", "ROOKS", "ROOKY", "ROOMS", "ROONS", "ROOPS", "ROOPY", "ROOSA", "ROOSE", "ROOTS", "ROOTY", "ROPED", "ROPER", "ROPES", "ROPEY", "ROQUE", "RORAL", "RORES", "RORIC", "RORID", "RORIE", "RORTS", "RORTY", "ROSED", "ROSES", "ROSET", "ROSHI", "ROSIN", "ROSIT", "ROSTI", "ROSTS", "ROTAL", "ROTAN", "ROTAS", "ROTCH", "ROTED", "ROTES", "ROTIS", "ROTLS", "ROTON", "ROTOS", "ROTTE", "ROUEN", "ROUES", "ROULE", "ROULS", "ROUMS", "ROUPS", "ROUPY", "ROUST", "ROUTH", "ROUTS", "ROVED", "ROVEN", "ROVES", "ROWAN", "ROWED", "ROWEL", "ROWEN", "ROWIE", "ROWME", "ROWND", "ROWTH", "ROWTS", "ROYNE", "ROYST", "ROZET", "ROZIT", "RUANA", "RUBAI", "RUBBY", "RUBEL", "RUBES", "RUBIN", "RUBLE", "RUBLI", "RUBUS", "RUCHE", "RUCKS", "RUDAS", "RUDDS", "RUDES", "RUDIE", "RUDIS", "RUEDA", "RUERS", "RUFFE", "RUFFS", "RUGAE", "RUGAL", "RUGGY", "RUING", "RUINS", "RUKHS", "RULED", "RULES", "RUMAL", "RUMBO", "RUMEN", "RUMES", "RUMLY", "RUMMY", "RUMPO", "RUMPS", "RUMPY", "RUNCH", "RUNDS", "RUNED", "RUNES", "RUNGS", "RUNIC", "RUNNY", "RUNTS", "RUNTY", "RUPIA", "RURPS", "RURUS", "RUSAS", "RUSES", "RUSHY", "RUSKS", "RUSMA", "RUSSE", "RUSTS", "RUTHS", "RUTIN", "RUTTY", "RYALS", "RYBAT", "RYKED", "RYKES", "RYMME", "RYNDS", "RYOTS", "RYPER", "SAAGS", "SABAL", "SABED", "SABER", "SABES", "SABHA", "SABIN", "SABIR", "SABLE", "SABOT", "SABRA", "SABRE", "SACKS", "SACRA", "SADDO", "SADES", "SADHE", "SADHU", "SADIS", "SADOS", "SADZA", "SAFED", "SAFES", "SAGAS", "SAGER", "SAGES", "SAGGY", "SAGOS", "SAGUM", "SAHEB", "SAHIB", "SAICE", "SAICK", "SAICS", "SAIDS", "SAIGA", "SAILS", "SAIMS", "SAINE", "SAINS", "SAIRS", "SAIST", "SAITH", "SAJOU", "SAKAI", "SAKER", "SAKES", "SAKIA", "SAKIS", "SAKTI", "SALAL", "SALAT", "SALEP", "SALES", "SALET", "SALIC", "SALIX", "SALLE", "SALMI", "SALOL", "SALOP", "SALPA", "SALPS", "SALSE", "SALTO", "SALTS", "SALUE", "SALUT", "SAMAN", "SAMAS", "SAMBA", "SAMBO", "SAMEK", "SAMEL", "SAMEN", "SAMES", "SAMEY", "SAMFU", "SAMMY", "SAMPI", "SAMPS", "SANDS", "SANED", "SANES", "SANGA", "SANGH", "SANGO", "SANGS", "SANKO", "SANSA", "SANTO", "SANTS", "SAOLA", "SAPAN", "SAPID", "SAPOR", "SARAN", "SARDS", "SARED", "SAREE", "SARGE", "SARGO", "SARIN", "SARIS", "SARKS", "SARKY", "SAROD", "SAROS", "SARUS", "SASER", "SASIN", "SASSE", "SATAI", "SATAY", "SATED", "SATEM", "SATES", "SATIS", "SAUBA", "SAUCH", "SAUGH", "SAULS", "SAULT", "SAUNT", "SAURY", "SAUTS", "SAVED", "SAVER", "SAVES", "SAVEY", "SAVIN", "SAWAH", "SAWED", "SAWER", "SAXES", "SAYED", "SAYER", "SAYID", "SAYNE", "SAYON", "SAYST", "SAZES", "SCABS", "SCADS", "SCAFF", "SCAGS", "SCAIL", "SCALA", "SCALL", "SCAMS", "SCAND", "SCANS", "SCAPA", "SCAPE", "SCAPI", "SCARP", "SCARS", "SCART", "SCATH", "SCATS", "SCATT", "SCAUD", "SCAUP", "SCAUR", "SCAWS", "SCEAT", "SCENA", "SCEND", "SCHAV", "SCHMO", "SCHUL", "SCHWA", "SCLIM", "SCODY", "SCOGS", "SCOOG", "SCOOT", "SCOPA", "SCOPS", "SCOTS", "SCOUG", "SCOUP", "SCOWP", "SCOWS", "SCRAB", "SCRAE", "SCRAG", "SCRAN", "SCRAT", "SCRAW", "SCRAY", "SCRIM", "SCRIP", "SCROB", "SCROD", "SCROG", "SCROW", "SCUDI", "SCUDO", "SCUDS", "SCUFF", "SCUFT", "SCUGS", "SCULK", "SCULL", "SCULP", "SCULS", "SCUMS", "SCUPS", "SCURF", "SCURS", "SCUSE", "SCUTA", "SCUTE", "SCUTS", "SCUZZ", "SCYES", "SDAYN", "SDEIN", "SEALS", "SEAME", "SEAMS", "SEAMY", "SEANS", "SEARE", "SEARS", "SEASE", "SEATS", "SEAZE", "SEBUM", "SECCO", "SECHS", "SECTS", "SEDER", "SEDES", "SEDGE", "SEDGY", "SEDUM", "SEEDS", "SEEKS", "SEELD", "SEELS", "SEELY", "SEEMS", "SEEPS", "SEEPY", "SEERS", "SEFER", "SEGAR", "SEGNI", "SEGNO", "SEGOL", "SEGOS", "SEHRI", "SEIFS", "SEILS", "SEINE", "SEIRS", "SEISE", "SEISM", "SEITY", "SEIZA", "SEKOS", "SEKTS", "SELAH", "SELES", "SELFS", "SELLA", "SELLE", "SELLS", "SELVA", "SEMEE", "SEMES", "SEMIE", "SEMIS", "SENAS", "SENDS", "SENES", "SENGI", "SENNA", "SENOR", "SENSA", "SENSI", "SENTE", "SENTI", "SENTS", "SENVY", "SENZA", "SEPAD", "SEPAL", "SEPIC", "SEPOY", "SEPTA", "SEPTS", "SERAC", "SERAI", "SERAL", "SERED", "SERER", "SERES", "SERFS", "SERGE", "SERIC", "SERIN", "SERKS", "SERON", "SEROW", "SERRA", "SERRE", "SERRS", "SERRY", "SERVO", "SESEY", "SESSA", "SETAE", "SETAL", "SETON", "SETTS", "SEWAN", "SEWAR", "SEWED", "SEWEL", "SEWEN", "SEWIN", "SEXED", "SEXER", "SEXES", "SEXTO", "SEXTS", "SEYEN", "SHADS", "SHAGS", "SHAHS", "SHAKO", "SHAKT", "SHALM", "SHALY", "SHAMA", "SHAMS", "SHAND", "SHANS", "SHAPS", "SHARN", "SHASH", "SHAUL", "SHAWM", "SHAWN", "SHAWS", "SHAYA", "SHAYS", "SHCHI", "SHEAF", "SHEAL", "SHEAS", "SHEDS", "SHEEL", "SHEND", "SHENT", "SHEOL", "SHERD", "SHERE", "SHERO", "SHETS", "SHEVA", "SHEWN", "SHEWS", "SHIAI", "SHIEL", "SHIER", "SHIES", "SHILL", "SHILY", "SHIMS", "SHINS", "SHIPS", "SHIRR", "SHIRS", "SHISH", "SHISO", "SHIST", "SHITE", "SHITS", "SHIUR", "SHIVA", "SHIVE", "SHIVS", "SHLEP", "SHLUB", "SHMEK", "SHMOE", "SHOAT", "SHOED", "SHOER", "SHOES", "SHOGI", "SHOGS", "SHOJI", "SHOJO", "SHOLA", "SHOOL", "SHOON", "SHOOS", "SHOPE", "SHOPS", "SHORL", "SHOTE", "SHOTS", "SHOTT", "SHOWD", "SHOWS", "SHOYU", "SHRED", "SHRIS", "SHROW", "SHTIK", "SHTUM", "SHTUP", "SHULE", "SHULN", "SHULS", "SHUNS", "SHURA", "SHUTE", "SHUTS", "SHWAS", "SHYER", "SIALS", "SIBBS", "SIBYL", "SICES", "SICHT", "SICKO", "SICKS", "SICKY", "SIDAS", "SIDED", "SIDER", "SIDES", "SIDHA", "SIDHE", "SIDLE", "SIELD", "SIENS", "SIENT", "SIETH", "SIEUR", "SIFTS", "SIGHS", "SIGIL", "SIGLA", "SIGNA", "SIGNS", "SIJOS", "SIKAS", "SIKER", "SIKES", "SILDS", "SILED", "SILEN", "SILER", "SILES", "SILEX", "SILKS", "SILLS", "SILOS", "SILTS", "SILTY", "SILVA", "SIMAR", "SIMAS", "SIMBA", "SIMIS", "SIMPS", "SIMUL", "SINDS", "SINED", "SINES", "SINGS", "SINHS", "SINKS", "SINKY", "SINUS", "SIPED", "SIPES", "SIPPY", "SIRED", "SIREE", "SIRES", "SIRIH", "SIRIS", "SIROC", "SIRRA", "SIRUP", "SISAL", "SISES", "SISTA", "SISTS", "SITAR", "SITED", "SITES", "SITHE", "SITKA", "SITUP", "SITUS", "SIVER", "SIXER", "SIXES", "SIXMO", "SIXTE", "SIZAR", "SIZED", "SIZEL", "SIZER", "SIZES", "SKAGS", "SKAIL", "SKALD", "SKANK", "SKART", "SKATS", "SKATT", "SKAWS", "SKEAN", "SKEAR", "SKEDS", "SKEED", "SKEEF", "SKEEN", "SKEER", "SKEES", "SKEET", "SKEGG", "SKEGS", "SKEIN", "SKELF", "SKELL", "SKELM", "SKELP", "SKENE", "SKENS", "SKEOS", "SKEPS", "SKERS", "SKETS", "SKEWS", "SKIDS", "SKIED", "SKIES", "SKIEY", "SKIMO", "SKIMS", "SKINK", "SKINS", "SKINT", "SKIOS", "SKIPS", "SKIRL", "SKIRR", "SKITE", "SKITS", "SKIVE", "SKIVY", "SKLIM", "SKOAL", "SKODY", "SKOFF", "SKOGS", "SKOLS", "SKOOL", "SKORT", "SKOSH", "SKRAN", "SKRIK", "SKUAS", "SKUGS", "SKYED", "SKYER", "SKYEY", "SKYFS", "SKYRE", "SKYRS", "SKYTE", "SLABS", "SLADE", "SLAES", "SLAGS", "SLAID", "SLAKE", "SLAMS", "SLANE", "SLANK", "SLAPS", "SLART", "SLATS", "SLATY", "SLAVE", "SLAWS", "SLAYS", "SLEBS", "SLEDS", "SLEER", "SLEWS", "SLEYS", "SLIER", "SLILY", "SLIMS", "SLIPE", "SLIPS", "SLIPT", "SLISH", "SLITS", "SLIVE", "SLOAN", "SLOBS", "SLOES", "SLOGS", "SLOID", "SLOJD", "SLOMO", "SLOOM", "SLOOT", "SLOPS", "SLOPY", "SLORM", "SLOTS", "SLOVE", "SLOWS", "SLOYD", "SLUBB", "SLUBS", "SLUED", "SLUES", "SLUFF", "SLUGS", "SLUIT", "SLUMS", "SLURB", "SLURS", "SLUSE", "SLUTS", "SLYER", "SLYPE", "SMAAK", "SMAIK", "SMALM", "SMALT", "SMARM", "SMAZE", "SMEEK", "SMEES", "SMEIK", "SMEKE", "SMERK", "SMEWS", "SMIRR", "SMIRS", "SMITS", "SMOGS", "SMOKO", "SMOLT", "SMOOR", "SMOOT", "SMORE", "SMORG", "SMOUT", "SMOWT", "SMUGS", "SMURS", "SMUSH", "SMUTS", "SNABS", "SNAFU", "SNAGS", "SNAPS", "SNARF", "SNARK", "SNARS", "SNARY", "SNASH", "SNATH", "SNAWS", "SNEAD", "SNEAP", "SNEBS", "SNECK", "SNEDS", "SNEED", "SNEES", "SNELL", "SNIBS", "SNICK", "SNIES", "SNIFT", "SNIGS", "SNIPS", "SNIPY", "SNIRT", "SNITS", "SNOBS", "SNODS", "SNOEK", "SNOEP", "SNOGS", "SNOKE", "SNOOD", "SNOOK", "SNOOL", "SNOOT", "SNOTS", "SNOWK", "SNOWS", "SNUBS", "SNUGS", "SNUSH", "SNYES", "SOAKS", "SOAPS", "SOARE", "SOARS", "SOAVE", "SOBAS", "SOCAS", "SOCES", "SOCKO", "SOCKS", "SOCLE", "SODAS", "SODDY", "SODIC", "SODOM", "SOFAR", "SOFAS", "SOFTA", "SOFTS", "SOFTY", "SOGER", "SOHUR", "SOILS", "SOILY", "SOJAS", "SOJUS", "SOKAH", "SOKEN", "SOKES", "SOKOL", "SOLAH", "SOLAN", "SOLAS", "SOLDE", "SOLDI", "SOLDO", "SOLDS", "SOLED", "SOLEI", "SOLER", "SOLES", "SOLON", "SOLOS", "SOLUM", "SOLUS", "SOMAN", "SOMAS", "SONCE", "SONDE", "SONES", "SONGS", "SONLY", "SONNE", "SONNY", "SONSE", "SONSY", "SOOEY", "SOOKS", "SOOKY", "SOOLE", "SOOLS", "SOOMS", "SOOPS", "SOOTE", "SOOTS", "SOPHS", "SOPHY", "SOPOR", "SOPPY", "SOPRA", "SORAL", "SORAS", "SORBO", "SORBS", "SORDA", "SORDO", "SORDS", "SORED", "SOREE", "SOREL", "SORER", "SORES", "SOREX", "SORGO", "SORNS", "SORRA", "SORTA", "SORTS", "SORUS", "SOTHS", "SOTOL", "SOUCE", "SOUCT", "SOUGH", "SOUKS", "SOULS", "SOUMS", "SOUPS", "SOUPY", "SOURS", "SOUSE", "SOUTS", "SOWAR", "SOWCE", "SOWED", "SOWFF", "SOWFS", "SOWLE", "SOWLS", "SOWMS", "SOWND", "SOWNE", "SOWPS", "SOWSE", "SOWTH", "SOYAS", "SOYLE", "SOYUZ", "SOZIN", "SPACY", "SPADO", "SPAED", "SPAER", "SPAES", "SPAGS", "SPAHI", "SPAIL", "SPAIN", "SPAIT", "SPAKE", "SPALD", "SPALE", "SPALL", "SPALT", "SPAMS", "SPANE", "SPANG", "SPANS", "SPARD", "SPARS", "SPART", "SPATE", "SPATS", "SPAUL", "SPAWL", "SPAWS", "SPAYD", "SPAYS", "SPAZA", "SPAZZ", "SPEAL", "SPEAN", "SPEAT", "SPECS", "SPECT", "SPEEL", "SPEER", "SPEIL", "SPEIR", "SPEKS", "SPELD", "SPELK", "SPEOS", "SPETS", "SPEUG", "SPEWS", "SPEWY", "SPIAL", "SPICA", "SPICK", "SPICS", "SPIDE", "SPIER", "SPIES", "SPIFF", "SPIFS", "SPIKS", "SPILE", "SPIMS", "SPINA", "SPINK", "SPINS", "SPIRT", "SPIRY", "SPITS", "SPITZ", "SPIVS", "SPLAY", "SPLOG", "SPODE", "SPODS", "SPOOM", "SPOOR", "SPOOT", "SPORK", "SPOSH", "SPOTS", "SPRAD", "SPRAG", "SPRAT", "SPRED", "SPREW", "SPRIT", "SPROD", "SPROG", "SPRUE", "SPRUG", "SPUDS", "SPUED", "SPUER", "SPUES", "SPUGS", "SPULE", "SPUME", "SPUMY", "SPURS", "SPUTA", "SPYAL", "SPYRE", "SQUAB", "SQUAW", "SQUEG", "SQUID", "SQUIT", "SQUIZ", "STABS", "STADE", "STAGS", "STAGY", "STAIG", "STANE", "STANG", "STAPH", "STAPS", "STARN", "STARR", "STARS", "STATS", "STAUN", "STAWS", "STAYS", "STEAN", "STEAR", "STEDD", "STEDE", "STEDS", "STEEK", "STEEM", "STEEN", "STEIL", "STELA", "STELE", "STELL", "STEME", "STEMS", "STEND", "STENO", "STENS", "STENT", "STEPS", "STEPT", "STERE", "STETS", "STEWS", "STEWY", "STEYS", "STICH", "STIED", "STIES", "STILB", "STILE", "STIME", "STIMS", "STIMY", "STIPA", "STIPE", "STIRE", "STIRK", "STIRP", "STIRS", "STIVE", "STIVY", "STOAE", "STOAI", "STOAS", "STOAT", "STOBS", "STOEP", "STOGY", "STOIT", "STOLN", "STOMA", "STOND", "STONG", "STONK", "STONN", "STOOK", "STOOR", "STOPE", "STOPS", "STOPT", "STOSS", "STOTS", "STOTT", "STOUN", "STOUP", "STOUR", "STOWN", "STOWP", "STOWS", "STRAD", "STRAE", "STRAG", "STRAK", "STREP", "STREW", "STRIA", "STRIG", "STRIM", "STROP", "STROW", "STROY", "STRUM", "STUBS", "STUDE", "STUDS", "STULL", "STULM", "STUMM", "STUMS", "STUNS", "STUPA", "STUPE", "STURE", "STURT", "STYED", "STYES", "STYLI", "STYLO", "STYME", "STYMY", "STYRE", "STYTE", "SUBAH", "SUBAS", "SUBBY", "SUBER", "SUBHA", "SUCCI", "SUCKS", "SUCKY", "SUCRE", "SUDDS", "SUDOR", "SUDSY", "SUEDE", "SUENT", "SUERS", "SUETE", "SUETS", "SUETY", "SUGAN", "SUGHS", "SUGOS", "SUHUR", "SUIDS", "SUINT", "SUITS", "SUJEE", "SUKHS", "SUKUK", "SULCI", "SULFA", "SULFO", "SULKS", "SULPH", "SULUS", "SUMIS", "SUMMA", "SUMOS", "SUMPH", "SUMPS", "SUNIS", "SUNKS", "SUNNA", "SUNNS", "SUNUP", "SUPES", "SUPRA", "SURAH", "SURAL", "SURAS", "SURAT", "SURDS", "SURED", "SURES", "SURFS", "SURFY", "SURGY", "SURRA", "SUSED", "SUSES", "SUSUS", "SUTOR", "SUTRA", "SUTTA", "SWABS", "SWACK", "SWADS", "SWAGE", "SWAGS", "SWAIL", "SWAIN", "SWALE", "SWALY", "SWAMY", "SWANG", "SWANK", "SWANS", "SWAPS", "SWAPT", "SWARD", "SWARE", "SWARF", "SWART", "SWATS", "SWAYL", "SWAYS", "SWEAL", "SWEDE", "SWEED", "SWEEL", "SWEER", "SWEES", "SWEIR", "SWELT", "SWERF", "SWEYS", "SWIES", "SWIGS", "SWILE", "SWIMS", "SWINK", "SWIPE", "SWIRE", "SWISS", "SWITH", "SWITS", "SWIVE", "SWIZZ", "SWOBS", "SWOLE", "SWOLN", "SWOPS", "SWOPT", "SWOTS", "SWOUN", "SYBBE", "SYBIL", "SYBOE", "SYBOW", "SYCEE", "SYCES", "SYCON", "SYENS", "SYKER", "SYKES", "SYLIS", "SYLPH", "SYLVA", "SYMAR", "SYNCH", "SYNCS", "SYNDS", "SYNED", "SYNES", "SYNTH", "SYPED", "SYPES", "SYPHS", "SYRAH", "SYREN", "SYSOP", "SYTHE", "SYVER", "TAALS", "TAATA", "TABER", "TABES", "TABID", "TABIS", "TABLA", "TABOR", "TABUN", "TABUS", "TACAN", "TACES", "TACET", "TACHE", "TACHO", "TACHS", "TACKS", "TACOS", "TACTS", "TAELS", "TAFIA", "TAGGY", "TAGMA", "TAHAS", "TAHRS", "TAIGA", "TAIGS", "TAIKO", "TAILS", "TAINS", "TAIRA", "TAISH", "TAITS", "TAJES", "TAKAS", "TAKES", "TAKHI", "TAKIN", "TAKIS", "TAKKY", "TALAK", "TALAQ", "TALAR", "TALAS", "TALCS", "TALCY", "TALEA", "TALER", "TALES", "TALKS", "TALKY", "TALLS", "TALMA", "TALPA", "TALUK", "TALUS", "TAMAL", "TAMED", "TAMES", "TAMIN", "TAMIS", "TAMMY", "TAMPS", "TANAS", "TANGA", "TANGI", "TANGS", "TANHS", "TANKA", "TANKS", "TANKY", "TANNA", "TANSY", "TANTI", "TANTO", "TANTY", "TAPAS", "TAPED", "TAPEN", "TAPES", "TAPET", "TAPIS", "TAPPA", "TAPUS", "TARAS", "TARDO", "TARED", "TARES", "TARGA", "TARGE", "TARNS", "TAROC", "TAROK", "TAROS", "TARPS", "TARRE", "TARRY", "TARSI", "TARTS", "TARTY", "TASAR", "TASED", "TASER", "TASES", "TASKS", "TASSA", "TASSE", "TASSO", "TATAR", "TATER", "TATES", "TATHS", "TATIE", "TATOU", "TATTS", "TATUS", "TAUBE", "TAULD", "TAUON", "TAUPE", "TAUTS", "TAVAH", "TAVAS", "TAVER", "TAWAI", "TAWAS", "TAWED", "TAWER", "TAWIE", "TAWSE", "TAWTS", "TAXED", "TAXER", "TAXES", "TAXIS", "TAXOL", "TAXON", "TAXOR", "TAXUS", "TAYRA", "TAZZA", "TAZZE", "TEADE", "TEADS", "TEAED", "TEAKS", "TEALS", "TEAMS", "TEARS", "TEATS", "TEAZE", "TECHS", "TECHY", "TECTA", "TEELS", "TEEMS", "TEEND", "TEENE", "TEENS", "TEENY", "TEERS", "TEFFS", "TEGGS", "TEGUA", "TEGUS", "TEHRS", "TEIID", "TEILS", "TEIND", "TEINS", "TELAE", "TELCO", "TELES", "TELEX", "TELIA", "TELIC", "TELLS", "TELLY", "TELOI", "TELOS", "TEMED", "TEMES", "TEMPI", "TEMPS", "TEMPT", "TEMSE", "TENCH", "TENDS", "TENDU", "TENES", "TENGE", "TENIA", "TENNE", "TENNO", "TENNY", "TENON", "TENTS", "TENTY", "TENUE", "TEPAL", "TEPAS", "TEPOY", "TERAI", "TERAS", "TERCE", "TEREK", "TERES", "TERFE", "TERFS", "TERGA", "TERMS", "TERNE", "TERNS", "TERRY", "TERTS", "TESLA", "TESTA", "TESTE", "TESTS", "TETES", "TETHS", "TETRA", "TETRI", "TEUCH", "TEUGH", "TEWED", "TEWEL", "TEWIT", "TEXAS", "TEXES", "TEXTS", "THACK", "THAGI", "THAIM", "THALE", "THALI", "THANA", "THANE", "THANG", "THANS", "THANX", "THARM", "THARS", "THAWS", "THAWY", "THEBE", "THECA", "THEED", "THEEK", "THEES", "THEGN", "THEIC", "THEIN", "THELF", "THEMA", "THENS", "THEOW", "THERM", "THESP", "THETE", "THEWS", "THEWY", "THIGS", "THILK", "THILL", "THINE", "THINS", "THIOL", "THIRL", "THOFT", "THOLE", "THOLI", "THORO", "THORP", "THOUS", "THOWL", "THRAE", "THRAW", "THRID", "THRIP", "THROE", "THUDS", "THUGS", "THUJA", "THUNK", "THURL", "THUYA", "THYMI", "THYMY", "TIANS", "TIARS", "TICAL", "TICCA", "TICED", "TICES", "TICHY", "TICKS", "TICKY", "TIDDY", "TIDED", "TIDES", "TIERS", "TIFFS", "TIFOS", "TIFTS", "TIGES", "TIGON", "TIKAS", "TIKES", "TIKIS", "TIKKA", "TILAK", "TILED", "TILER", "TILES", "TILLS", "TILLY", "TILTH", "TILTS", "TIMBO", "TIMED", "TIMES", "TIMON", "TIMPS", "TINAS", "TINCT", "TINDS", "TINEA", "TINED", "TINES", "TINGE", "TINGS", "TINKS", "TINNY", "TINTS", "TINTY", "TIPIS", "TIPPY", "TIRED", "TIRES", "TIRLS", "TIROS", "TIRRS", "TITCH", "TITER", "TITIS", "TITRE", "TITTY", "TITUP", "TIYIN", "TIYNS", "TIZES", "TIZZY", "TOADS", "TOADY", "TOAZE", "TOCKS", "TOCKY", "TOCOS", "TODDE", "TOEAS", "TOFFS", "TOFFY", "TOFTS", "TOFUS", "TOGAE", "TOGAS", "TOGED", "TOGES", "TOGUE", "TOHOS", "TOILE", "TOILS", "TOING", "TOISE", "TOITS", "TOKAY", "TOKED", "TOKER", "TOKES", "TOKOS", "TOLAN", "TOLAR", "TOLAS", "TOLED", "TOLES", "TOLLS", "TOLLY", "TOLTS", "TOLUS", "TOLYL", "TOMAN", "TOMBS", "TOMES", "TOMIA", "TOMMY", "TOMOS", "TONDI", "TONDO", "TONED", "TONER", "TONES", "TONEY", "TONGS", "TONKA", "TONKS", "TONNE", "TONUS", "TOOLS", "TOOMS", "TOONS", "TOOTS", "TOPED", "TOPEE", "TOPEK", "TOPER", "TOPES", "TOPHE", "TOPHI", "TOPHS", "TOPIS", "TOPOI", "TOPOS", "TOPPY", "TOQUE", "TORAH", "TORAN", "TORAS", "TORCS", "TORES", "TORIC", "TORII", "TOROS", "TOROT", "TORRS", "TORSE", "TORSI", "TORSK", "TORTA", "TORTE", "TORTS", "TOSAS", "TOSED", "TOSES", "TOSHY", "TOSSY", "TOTED", "TOTER", "TOTES", "TOTTY", "TOUKS", "TOUNS", "TOURS", "TOUSE", "TOUSY", "TOUTS", "TOUZE", "TOUZY", "TOWED", "TOWIE", "TOWNS", "TOWNY", "TOWSE", "TOWSY", "TOWTS", "TOWZE", "TOWZY", "TOYED", "TOYER", "TOYON", "TOYOS", "TOZED", "TOZES", "TOZIE", "TRABS", "TRADS", "TRAGI", "TRAIK", "TRAMS", "TRANK", "TRANQ", "TRANS", "TRANT", "TRAPE", "TRAPS", "TRAPT", "TRASS", "TRATS", "TRATT", "TRAVE", "TRAYF", "TRAYS", "TRECK", "TREED", "TREEN", "TREES", "TREFA", "TREIF", "TREKS", "TREMA", "TREMS", "TRESS", "TREST", "TRETS", "TREWS", "TREYF", "TREYS", "TRIAC", "TRIDE", "TRIER", "TRIES", "TRIFF", "TRIGO", "TRIGS", "TRIKE", "TRILD", "TRILL", "TRIMS", "TRINE", "TRINS", "TRIOL", "TRIOR", "TRIOS", "TRIPS", "TRIPY", "TRIST", "TROAD", "TROAK", "TROAT", "TROCK", "TRODE", "TRODS", "TROGS", "TROIS", "TROKE", "TROMP", "TRONA", "TRONC", "TRONE", "TRONK", "TRONS", "TROOZ", "TROTH", "TROTS", "TROWS", "TROYS", "TRUED", "TRUES", "TRUGO", "TRUGS", "TRULL", "TRYER", "TRYKE", "TRYMA", "TRYPS", "TSADE", "TSADI", "TSARS", "TSKED", "TSUBA", "TSUBO", "TUANS", "TUART", "TUATH", "TUBAE", "TUBAR", "TUBAS", "TUBBY", "TUBED", "TUBES", "TUCKS", "TUFAS", "TUFFE", "TUFFS", "TUFTS", "TUFTY", "TUGRA", "TUILE", "TUINA", "TUISM", "TUKTU", "TULES", "TULPA", "TULSI", "TUMID", "TUMMY", "TUMPS", "TUMPY", "TUNAS", "TUNDS", "TUNED", "TUNER", "TUNES", "TUNGS", "TUNNY", "TUPEK", "TUPIK", "TUPLE", "TUQUE", "TURDS", "TURFS", "TURFY", "TURKS", "TURME", "TURMS", "TURNS", "TURNT", "TURPS", "TURRS", "TUSHY", "TUSKS", "TUSKY", "TUTEE", "TUTTI", "TUTTY", "TUTUS", "TUXES", "TUYER", "TWAES", "TWAIN", "TWALS", "TWANK", "TWATS", "TWAYS", "TWEEL", "TWEEN", "TWEEP", "TWEER", "TWERK", "TWERP", "TWIER", "TWIGS", "TWILL", "TWILT", "TWINK", "TWINS", "TWINY", "TWIRE", "TWIRP", "TWITE", "TWITS", "TWOER", "TWYER", "TYEES", "TYERS", "TYIYN", "TYKES", "TYLER", "TYMPS", "TYNDE", "TYNED", "TYNES", "TYPAL", "TYPED", "TYPES", "TYPEY", "TYPIC", "TYPOS", "TYPPS", "TYPTO", "TYRAN", "TYRED", "TYRES", "TYROS", "TYTHE", "TZARS", "UDALS", "UDONS", "UGALI", "UGGED", "UHLAN", "UHURU", "UKASE", "ULAMA", "ULANS", "ULEMA", "ULMIN", "ULNAD", "ULNAE", "ULNAR", "ULNAS", "ULPAN", "ULVAS", "ULYIE", "ULZIE", "UMAMI", "UMBEL", "UMBER", "UMBLE", "UMBOS", "UMBRE", "UMIAC", "UMIAK", "UMIAQ", "UMMAH", "UMMAS", "UMMED", "UMPED", "UMPHS", "UMPIE", "UMPTY", "UMRAH", "UMRAS", "UNAIS", "UNAPT", "UNARM", "UNARY", "UNAUS", "UNBAG", "UNBAN", "UNBAR", "UNBED", "UNBID", "UNBOX", "UNCAP", "UNCES", "UNCIA", "UNCOS", "UNCOY", "UNCUS", "UNDAM", "UNDEE", "UNDOS", "UNDUG", "UNETH", "UNFIX", "UNGAG", "UNGET", "UNGOD", "UNGOT", "UNGUM", "UNHAT", "UNHIP", "UNICA", "UNITS", "UNJAM", "UNKED", "UNKET", "UNKID", "UNLAW", "UNLAY", "UNLED", "UNLET", "UNLID", "UNMAN", "UNMEW", "UNMIX", "UNPAY", "UNPEG", "UNPEN", "UNPIN", "UNRED", "UNRID", "UNRIG", "UNRIP", "UNSAW", "UNSAY", "UNSEE", "UNSEW", "UNSEX", "UNSOD", "UNTAX", "UNTIN", "UNWET", "UNWIT", "UNWON", "UPBOW", "UPBYE", "UPDOS", "UPDRY", "UPEND", "UPJET", "UPLAY", "UPLED", "UPLIT", "UPPED", "UPRAN", "UPRUN", "UPSEE", "UPSEY", "UPTAK", "UPTER", "UPTIE", "URAEI", "URALI", "URAOS", "URARE", "URARI", "URASE", "URATE", "URBEX", "URBIA", "URDEE", "UREAL", "UREAS", "UREDO", "UREIC", "URENA", "URENT", "URGED", "URGER", "URGES", "URIAL", "URITE", "URMAN", "URNAL", "URNED", "URPED", "URSAE", "URSID", "URSON", "URUBU", "URVAS", "USERS", "USNEA", "USQUE", "USURE", "USURY", "UTERI", "UVEAL", "UVEAS", "UVULA", "VACUA", "VADED", "VADES", "VAGAL", "VAGUS", "VAILS", "VAIRE", "VAIRS", "VAIRY", "VAKAS", "VAKIL", "VALES", "VALIS", "VALSE", "VAMPS", "VAMPY", "VANDA", "VANED", "VANES", "VANGS", "VANTS", "VAPED", "VAPER", "VAPES", "VARAN", "VARAS", "VARDY", "VAREC", "VARES", "VARIA", "VARIX", "VARNA", "VARUS", "VARVE", "VASAL", "VASES", "VASTS", "VASTY", "VATIC", "VATUS", "VAUCH", "VAUTE", "VAUTS", "VAWTE", "VAXES", "VEALE", "VEALS", "VEALY", "VEENA", "VEEPS", "VEERS", "VEERY", "VEGAS", "VEGES", "VEGIE", "VEGOS", "VEHME", "VEILS", "VEILY", "VEINS", "VEINY", "VELAR", "VELDS", "VELDT", "VELES", "VELLS", "VELUM", "VENAE", "VENAL", "VENDS", "VENDU", "VENEY", "VENGE", "VENIN", "VENTS", "VENUS", "VERBS", "VERRA", "VERRY", "VERST", "VERTS", "VERTU", "VESPA", "VESTA", "VESTS", "VETCH", "VEXED", "VEXER", "VEXES", "VEXIL", "VEZIR", "VIALS", "VIAND", "VIBES", "VIBEX", "VIBEY", "VICED", "VICES", "VICHY", "VIERS", "VIEWS", "VIEWY", "VIFDA", "VIFFS", "VIGAS", "VIGIA", "VILDE", "VILER", "VILLI", "VILLS", "VIMEN", "VINAL", "VINAS", "VINCA", "VINED", "VINER", "VINES", "VINEW", "VINIC", "VINOS", "VINTS", "VIOLD", "VIOLS", "VIRED", "VIREO", "VIRES", "VIRGA", "VIRGE", "VIRID", "VIRLS", "VIRTU", "VISAS", "VISED", "VISES", "VISIE", "VISNE", "VISON", "VISTO", "VITAE", "VITAS", "VITEX", "VITRO", "VITTA", "VIVAS", "VIVAT", "VIVDA", "VIVER", "VIVES", "VIZIR", "VIZOR", "VLEIS", "VLIES", "VLOGS", "VOARS", "VOCAB", "VOCES", "VODDY", "VODOU", "VODUN", "VOEMA", "VOGIE", "VOIDS", "VOILE", "VOIPS", "VOLAE", "VOLAR", "VOLED", "VOLES", "VOLET", "VOLKS", "VOLTA", "VOLTE", "VOLTI", "VOLTS", "VOLVA", "VOLVE", "VOMER", "VOTED", "VOTES", "VOUGE", "VOULU", "VOWED", "VOWER", "VOXEL", "VOZHD", "VRAIC", "VRILS", "VROOM", "VROUS", "VROUW", "VROWS", "VUGGS", "VUGGY", "VUGHS", "VUGHY", "VULGO", "VULNS", "VULVA", "VUTTY", "WAACS", "WACKE", "WACKO", "WACKS", "WADDS", "WADDY", "WADED", "WADER", "WADES", "WADGE", "WADIS", "WADTS", "WAFFS", "WAFTS", "WAGED", "WAGES", "WAGGA", "WAGYU", "WAHOO", "WAIDE", "WAIFS", "WAIFT", "WAILS", "WAINS", "WAIRS", "WAITE", "WAITS", "WAKAS", "WAKED", "WAKEN", "WAKER", "WAKES", "WAKFS", "WALDO", "WALDS", "WALED", "WALER", "WALES", "WALIE", "WALIS", "WALKS", "WALLA", "WALLS", "WALLY", "WALTY", "WAMED", "WAMES", "WAMUS", "WANDS", "WANED", "WANES", "WANEY", "WANGS", "WANKS", "WANKY", "WANLE", "WANLY", "WANNA", "WANTS", "WANTY", "WANZE", "WAQFS", "WARBS", "WARBY", "WARDS", "WARED", "WARES", "WAREZ", "WARKS", "WARMS", "WARNS", "WARPS", "WARRE", "WARST", "WARTS", "WASES", "WASHY", "WASMS", "WASPS", "WASPY", "WASTS", "WATAP", "WATTS", "WAUFF", "WAUGH", "WAUKS", "WAULK", "WAULS", "WAURS", "WAVED", "WAVES", "WAVEY", "WAWAS", "WAWES", "WAWLS", "WAXED", "WAXER", "WAXES", "WAYED", "WAZIR", "WAZOO", "WEALD", "WEALS", "WEAMB", "WEANS", "WEARS", "WEBBY", "WEBER", "WECHT", "WEDEL", "WEDGY", "WEEDS", "WEEKE", "WEEKS", "WEELS", "WEEMS", "WEENS", "WEENY", "WEEPS", "WEEPY", "WEEST", "WEETE", "WEETS", "WEFTE", "WEFTS", "WEIDS", "WEILS", "WEIRS", "WEISE", "WEIZE", "WEKAS", "WELDS", "WELKE", "WELKS", "WELKT", "WELLS", "WELLY", "WELTS", "WEMBS", "WENCH", "WENDS", "WENGE", "WENNY", "WENTS", "WEROS", "WERSH", "WESTS", "WETAS", "WETLY", "WEXED", "WEXES", "WHAMO", "WHAMS", "WHANG", "WHAPS", "WHARE", "WHATA", "WHATS", "WHAUP", "WHAUR", "WHEAL", "WHEAR", "WHEEN", "WHEEP", "WHEFT", "WHELK", "WHELM", "WHENS", "WHETS", "WHEWS", "WHEYS", "WHIDS", "WHIFT", "WHIGS", "WHILK", "WHIMS", "WHINS", "WHIOS", "WHIPS", "WHIPT", "WHIRR", "WHIRS", "WHISH", "WHISS", "WHIST", "WHITS", "WHITY", "WHIZZ", "WHOMP", "WHOOF", "WHOOT", "WHOPS", "WHORE", "WHORL", "WHORT", "WHOSO", "WHOWS", "WHUMP", "WHUPS", "WHYDA", "WICCA", "WICKS", "WICKY", "WIDDY", "WIDES", "WIELS", "WIFED", "WIFES", "WIFEY", "WIFIE", "WIFTY", "WIGAN", "WIGGA", "WIGGY", "WIKIS", "WILCO", "WILDS", "WILED", "WILES", "WILGA", "WILIS", "WILJA", "WILLS", "WILTS", "WIMPS", "WINDS", "WINED", "WINES", "WINEY", "WINGE", "WINGS", "WINGY", "WINKS", "WINNA", "WINNS", "WINOS", "WINZE", "WIPED", "WIPER", "WIPES", "WIRED", "WIRER", "WIRES", "WIRRA", "WISED", "WISES", "WISHA", "WISHT", "WISPS", "WISTS", "WITAN", "WITED", "WITES", "WITHE", "WITHS", "WITHY", "WIVED", "WIVER", "WIVES", "WIZEN", "WIZES", "WOADS", "WOALD", "WOCKS", "WODGE", "WOFUL", "WOJUS", "WOKER", "WOKKA", "WOLDS", "WOLFS", "WOLLY", "WOLVE", "WOMBS", "WOMBY", "WOMYN", "WONGA", "WONGI", "WONKS", "WONKY", "WONTS", "WOODS", "WOOED", "WOOFS", "WOOFY", "WOOLD", "WOOLS", "WOONS", "WOOPS", "WOOPY", "WOOSE", "WOOSH", "WOOTZ", "WORDS", "WORKS", "WORMS", "WORMY", "WORTS", "WOWED", "WOWEE", "WOXEN", "WRANG", "WRAPS", "WRAPT", "WRAST", "WRATE", "WRAWL", "WRENS", "WRICK", "WRIED", "WRIER", "WRIES", "WRITS", "WROKE", "WROOT", "WROTH", "WRYER", "WUDDY", "WUDUS", "WULLS", "WURST", "WUSES", "WUSHU", "WUSSY", "WUXIA", "WYLED", "WYLES", "WYNDS", "WYNNS", "WYTED", "WYTES", "XEBEC", "XENIA", "XENIC", "XENON", "XERIC", "XEROX", "XERUS", "XOANA", "XRAYS", "XYLAN", "XYLEM", "XYLIC", "XYLOL", "XYLYL", "XYSTI", "XYSTS", "YAARS", "YABAS", "YABBA", "YABBY", "YACCA", "YACKA", "YACKS", "YAFFS", "YAGER", "YAGES", "YAGIS", "YAHOO", "YAIRD", "YAKKA", "YAKOW", "YALES", "YAMEN", "YAMPY", "YAMUN", "YANGS", "YANKS", "YAPOK", "YAPON", "YAPPS", "YAPPY", "YARAK", "YARCO", "YARDS", "YARER", "YARFA", "YARKS", "YARNS", "YARRS", "YARTA", "YARTO", "YATES", "YAUDS", "YAULD", "YAUPS", "YAWED", "YAWEY", "YAWLS", "YAWNS", "YAWNY", "YAWPS", "YBORE", "YCLAD", "YCLED", "YCOND", "YDRAD", "YDRED", "YEADS", "YEAHS", "YEALM", "YEANS", "YEARD", "YEARS", "YECCH", "YECHS", "YECHY", "YEDES", "YEEDS", "YEESH", "YEGGS", "YELKS", "YELLS", "YELMS", "YELPS", "YELTS", "YENTA", "YENTE", "YERBA", "YERDS", "YERKS", "YESES", "YESKS", "YESTS", "YESTY", "YETIS", "YETTS", "YEUKS", "YEUKY", "YEVEN", "YEVES", "YEWEN", "YEXED", "YEXES", "YFERE", "YIKED", "YIKES", "YILLS", "YINCE", "YIPES", "YIPPY", "YIRDS", "YIRKS", "YIRRS", "YIRTH", "YITES", "YITIE", "YLEMS", "YLIKE", "YLKES", "YMOLT", "YMPES", "YOBBO", "YOBBY", "YOCKS", "YODEL", "YODHS", "YODLE", "YOGAS", "YOGEE", "YOGHS", "YOGIC", "YOGIN", "YOGIS", "YOICK", "YOJAN", "YOKED", "YOKEL", "YOKER", "YOKES", "YOKUL", "YOLKS", "YOLKY", "YOMIM", "YOMPS", "YONIC", "YONIS", "YONKS", "YOOFS", "YOOPS", "YORES", "YORKS", "YORPS", "YOUKS", "YOURN", "YOURS", "YOURT", "YOUSE", "YOWED", "YOWES", "YOWIE", "YOWLS", "YOWZA", "YRAPT", "YRENT", "YRIVD", "YRNEH", "YSAME", "YTOST", "YUANS", "YUCAS", "YUCCA", "YUCCH", "YUCKO", "YUCKS", "YUCKY", "YUFTS", "YUGAS", "YUKED", "YUKES", "YUKKY", "YUKOS", "YULAN", "YULES", "YUMMO", "YUMMY", "YUMPS", "YUPON", "YUPPY", "YURTA", "YURTS", "YUZUS", "ZABRA", "ZACKS", "ZAIDA", "ZAIDY", "ZAIRE", "ZAKAT", "ZAMAN", "ZAMBO", "ZAMIA", "ZANJA", "ZANTE", "ZANZA", "ZANZE", "ZAPPY", "ZARFS", "ZARIS", "ZATIS", "ZAXES", "ZAYIN", "ZAZEN", "ZEALS", "ZEBEC", "ZEBUB", "ZEBUS", "ZEDAS", "ZEINS", "ZENDO", "ZERDA", "ZERKS", "ZEROS", "ZESTS", "ZETAS", "ZEXES", "ZEZES", "ZHOMO", "ZIBET", "ZIFFS", "ZIGAN", "ZILAS", "ZILCH", "ZILLA", "ZILLS", "ZIMBI", "ZIMBS", "ZINCO", "ZINCS", "ZINCY", "ZINEB", "ZINES", "ZINGS", "ZINGY", "ZINKE", "ZINKY", "ZIPPO", "ZIPPY", "ZIRAM", "ZITIS", "ZIZEL", "ZIZIT", "ZLOTE", "ZLOTY", "ZOAEA", "ZOBOS", "ZOBUS", "ZOCCO", "ZOEAE", "ZOEAL", "ZOEAS", "ZOISM", "ZOIST", "ZOMBI", "ZONAE", "ZONDA", "ZONED", "ZONER", "ZONES", "ZONKS", "ZOOEA", "ZOOEY", "ZOOID", "ZOOKS", "ZOOMS", "ZOONS", "ZOOTY", "ZOPPA", "ZOPPO", "ZORIL", "ZORIS", "ZORRO", "ZOUKS", "ZOWEE", "ZOWIE", "ZULUS", "ZUPAN", "ZUPAS", "ZUPPA", "ZURFS", "ZUZIM", "ZYGAL", "ZYGON", "ZYMES", "ZYMIC", "CIGAR", "REBUT", "SISSY", "HUMPH", "AWAKE", "BLUSH", "FOCAL", "EVADE", "NAVAL", "SERVE", "HEATH", "DWARF", "MODEL", "KARMA", "STINK", "GRADE", "QUIET", "BENCH", "ABATE", "FEIGN", "MAJOR", "DEATH", "FRESH", "CRUST", "STOOL", "COLON", "ABASE", "MARRY", "REACT", "BATTY", "PRIDE", "FLOSS", "HELIX", "CROAK", "STAFF", "PAPER", "UNFED", "WHELP", "TRAWL", "OUTDO", "ADOBE", "CRAZY", "SOWER", "REPAY", "DIGIT", "CRATE", "CLUCK", "SPIKE", "MIMIC", "POUND", "MAXIM", "LINEN", "UNMET", "FLESH", "BOOBY", "FORTH", "FIRST", "STAND", "BELLY", "IVORY", "SEEDY", "PRINT", "YEARN", "DRAIN", "BRIBE", "STOUT", "PANEL", "CRASS", "FLUME", "OFFAL", "AGREE", "ERROR", "SWIRL", "ARGUE", "BLEED", "DELTA", "FLICK", "TOTEM", "WOOER", "FRONT", "SHRUB", "PARRY", "BIOME", "LAPEL", "START", "GREET", "GONER", "GOLEM", "LUSTY", "LOOPY", "ROUND", "AUDIT", "LYING", "GAMMA", "LABOR", "ISLET", "CIVIC", "FORGE", "CORNY", "MOULT", "BASIC", "SALAD", "AGATE", "SPICY", "SPRAY", "ESSAY", "FJORD", "SPEND", "KEBAB", "GUILD", "ABACK", "MOTOR", "ALONE", "HATCH", "HYPER", "THUMB", "DOWRY", "OUGHT", "BELCH", "DUTCH", "PILOT", "TWEED", "COMET", "JAUNT", "ENEMA", "STEED", "ABYSS", "GROWL", "FLING", "DOZEN", "BOOZY", "ERODE", "WORLD", "GOUGE", "CLICK", "BRIAR", "GREAT", "ALTAR", "PULPY", "BLURT", "COAST", "DUCHY", "GROIN", "FIXER", "GROUP", "ROGUE", "BADLY", "SMART", "PITHY", "GAUDY", "CHILL", "HERON", "VODKA", "FINER", "SURER", "RADIO", "ROUGE", "PERCH", "RETCH", "WROTE", "CLOCK", "TILDE", "STORE", "PROVE", "BRING", "SOLVE", "CHEAT", "GRIME", "EXULT", "USHER", "EPOCH", "TRIAD", "BREAK", "RHINO", "VIRAL", "CONIC", "MASSE", "SONIC", "VITAL", "TRACE", "USING", "PEACH", "CHAMP", "BATON", "BRAKE", "PLUCK", "CRAZE", "GRIPE", "WEARY", "PICKY", "ACUTE", "FERRY", "ASIDE", "TAPIR", "TROLL", "UNIFY", "REBUS", "BOOST", "TRUSS", "SIEGE", "TIGER", "BANAL", "SLUMP", "CRANK", "GORGE", "QUERY", "DRINK", "FAVOR", "ABBEY", "TANGY", "PANIC", "SOLAR", "SHIRE", "PROXY", "POINT", "ROBOT", "PRICK", "WINCE", "CRIMP", "KNOLL", "SUGAR", "WHACK", "MOUNT", "PERKY", "COULD", "WRUNG", "LIGHT", "THOSE", "MOIST", "SHARD", "PLEAT", "ALOFT", "SKILL", "ELDER", "FRAME", "HUMOR", "PAUSE", "ULCER", "ULTRA", "ROBIN", "CYNIC", "AROMA", "CAULK", "SHAKE", "DODGE", "SWILL", "TACIT", "OTHER", "THORN", "TROVE", "BLOKE", "VIVID", "SPILL", "CHANT", "CHOKE", "RUPEE", "NASTY", "MOURN", "AHEAD", "BRINE", "CLOTH", "HOARD", "SWEET", "MONTH", "LAPSE", "WATCH", "TODAY", "FOCUS", "SMELT", "TEASE", "CATER", "MOVIE", "SAUTE", "ALLOW", "RENEW", "THEIR", "SLOSH", "PURGE", "CHEST", "DEPOT", "EPOXY", "NYMPH", "FOUND", "SHALL", "STOVE", "LOWLY", "SNOUT", "TROPE", "FEWER", "SHAWL", "NATAL", "COMMA", "FORAY", "SCARE", "STAIR", "BLACK", "SQUAD", "ROYAL", "CHUNK", "MINCE", "SHAME", "CHEEK", "AMPLE", "FLAIR", "FOYER", "CARGO", "OXIDE", "PLANT", "OLIVE", "INERT", "ASKEW", "HEIST", "SHOWN", "ZESTY", "TRASH", "LARVA", "FORGO", "STORY", "HAIRY", "TRAIN", "HOMER", "BADGE", "MIDST", "CANNY", "SHINE", "GECKO", "FARCE", "SLUNG", "TIPSY", "METAL", "YIELD", "DELVE", "BEING", "SCOUR", "GLASS", "GAMER", "SCRAP", "MONEY", "HINGE", "ALBUM", "VOUCH", "ASSET", "TIARA", "CREPT", "BAYOU", "ATOLL", "MANOR", "CREAK", "SHOWY", "PHASE", "FROTH", "DEPTH", "GLOOM", "FLOOD", "TRAIT", "GIRTH", "PIETY", "GOOSE", "FLOAT", "DONOR", "ATONE", "PRIMO", "APRON", "BLOWN", "CACAO", "LOSER", "INPUT", "GLOAT", "AWFUL", "BRINK", "SMITE", "BEADY", "RUSTY", "RETRO", "DROLL", "GAWKY", "HUTCH", "PINTO", "EGRET", "LILAC", "SEVER", "FIELD", "FLUFF", "AGAPE", "VOICE", "STEAD", "BERTH", "MADAM", "NIGHT", "BLAND", "LIVER", "WEDGE", "ROOMY", "WACKY", "FLOCK", "ANGRY", "TRITE", "APHID", "TRYST", "MIDGE", "POWER", "ELOPE", "CINCH", "MOTTO", "STOMP", "UPSET", "BLUFF", "CRAMP", "QUART", "COYLY", "YOUTH", "RHYME", "BUGGY", "ALIEN", "SMEAR", "UNFIT", "PATTY", "CLING", "GLEAN", "LABEL", "HUNKY", "KHAKI", "POKER", "GRUEL", "TWICE", "TWANG", "SHRUG", "TREAT", "WASTE", "MERIT", "WOVEN", "NEEDY", "CLOWN", "IRONY", "RUDER", "GAUZE", "CHIEF", "ONSET", "PRIZE", "FUNGI", "CHARM", "GULLY", "INTER", "WHOOP", "TAUNT", "LEERY", "CLASS", "THEME", "LOFTY", "TIBIA", "BOOZE", "ALPHA", "THYME", "DOUBT", "PARER", "CHUTE", "STICK", "TRICE", "ALIKE", "RECAP", "SAINT", "GLORY", "GRATE", "ADMIT", "BRISK", "SOGGY", "USURP", "SCALD", "SCORN", "LEAVE", "TWINE", "STING", "BOUGH", "MARSH", "SLOTH", "DANDY", "VIGOR", "HOWDY", "ENJOY", "VALID", "IONIC", "EQUAL", "FLOOR", "CATCH", "SPADE", "STEIN", "EXIST", "QUIRK", "DENIM", "GROVE", "SPIEL", "MUMMY", "FAULT", "FOGGY", "FLOUT", "CARRY", "SNEAK", "LIBEL", "WALTZ", "APTLY", "PINEY", "INEPT", "ALOUD", "PHOTO", "DREAM", "STALE", "UNITE", "SNARL", "BAKER", "THERE", "GLYPH", "POOCH", "HIPPY", "SPELL", "FOLLY", "LOUSE", "GULCH", "VAULT", "GODLY", "THREW", "FLEET", "GRAVE", "INANE", "SHOCK", "CRAVE", "SPITE", "VALVE", "SKIMP", "CLAIM", "RAINY", "MUSTY", "PIQUE", "DADDY", "QUASI", "ARISE", "AGING", "VALET", "OPIUM", "AVERT", "STUCK", "RECUT", "MULCH", "GENRE", "PLUME", "RIFLE", "COUNT", "INCUR", "TOTAL", "WREST", "MOCHA", "DETER", "STUDY", "LOVER", "SAFER", "RIVET", "FUNNY", "SMOKE", "MOUND", "UNDUE", "SEDAN", "PAGAN", "SWINE", "GUILE", "GUSTY", "EQUIP", "TOUGH", "CANOE", "CHAOS", "COVET", "HUMAN", "UDDER", "LUNCH", "BLAST", "STRAY", "MANGA", "MELEE", "LEFTY", "QUICK", "PASTE", "GIVEN", "OCTET", "RISEN", "GROAN", "LEAKY", "GRIND", "CARVE", "LOOSE", "SADLY", "SPILT", "APPLE", "SLACK", "HONEY", "FINAL", "SHEEN", "EERIE", "MINTY", "SLICK", "DERBY", "WHARF", "SPELT", "COACH", "ERUPT", "SINGE", "PRICE", "SPAWN", "FAIRY", "JIFFY", "FILMY", "STACK", "CHOSE", "SLEEP", "ARDOR", "NANNY", "NIECE", "WOOZY", "HANDY", "GRACE", "DITTO", "STANK", "CREAM", "USUAL", "DIODE", "VALOR", "ANGLE", "NINJA", "MUDDY", "CHASE", "REPLY", "PRONE", "SPOIL", "HEART", "SHADE", "DINER", "ARSON", "ONION", "SLEET", "DOWEL", "COUCH", "PALSY", "BOWEL", "SMILE", "EVOKE", "CREEK", "LANCE", "EAGLE", "IDIOT", "SIREN", "BUILT", "EMBED", "AWARD", "DROSS", "ANNUL", "GOODY", "FROWN", "PATIO", "LADEN", "HUMID", "ELITE", "LYMPH", "EDIFY", "MIGHT", "RESET", "VISIT", "GUSTO", "PURSE", "VAPOR", "CROCK", "WRITE", "SUNNY", "LOATH", "CHAFF", "SLIDE", "QUEER", "VENOM", "STAMP", "SORRY", "STILL", "ACORN", "APING", "PUSHY", "TAMER", "HATER", "MANIA", "AWOKE", "BRAWN", "SWIFT", "EXILE", "BIRCH", "LUCKY", "FREER", "RISKY", "GHOST", "PLIER", "LUNAR", "WINCH", "SNARE", "NURSE", "HOUSE", "BORAX", "NICER", "LURCH", "EXALT", "ABOUT", "SAVVY", "TOXIN", "TUNIC", "PRIED", "INLAY", "CHUMP", "LANKY", "CRESS", "EATER", "ELUDE", "CYCLE", "KITTY", "BOULE", "MORON", "TENET", "PLACE", "LOBBY", "PLUSH", "VIGIL", "INDEX", "BLINK", "CLUNG", "QUALM", "CROUP", "CLINK", "JUICY", "STAGE", "DECAY", "NERVE", "FLIER", "SHAFT", "CROOK", "CLEAN", "CHINA", "RIDGE", "VOWEL", "GNOME", "SNUCK", "ICING", "SPINY", "RIGOR", "SNAIL", "FLOWN", "RABID", "PROSE", "THANK", "POPPY", "BUDGE", "FIBER", "MOLDY", "DOWDY", "KNEEL", "TRACK", "CADDY", "QUELL", "DUMPY", "PALER", "SWORE", "REBAR", "SCUBA", "SPLAT", "FLYER", "HORNY", "MASON", "DOING", "OZONE", "AMPLY", "MOLAR", "OVARY", "BESET", "QUEUE", "CLIFF", "MAGIC", "TRUCE", "SPORT", "FRITZ", "EDICT", "TWIRL", "VERSE", "LLAMA", "EATEN", "RANGE", "WHISK", "HOVEL", "REHAB", "MACAW", "SIGMA", "SPOUT", "VERVE", "SUSHI", "DYING", "FETID", "BRAIN", "BUDDY", "THUMP", "SCION", "CANDY", "CHORD", "BASIN", "MARCH", "CROWD", "ARBOR", "GAYLY", "MUSKY", "STAIN", "DALLY", "BLESS", "BRAVO", "STUNG", "TITLE", "RULER", "KIOSK", "BLOND", "ENNUI", "LAYER", "FLUID", "TATTY", "SCORE", "CUTIE", "ZEBRA", "BARGE", "MATEY", "BLUER", "AIDER", "SHOOK", "RIVER", "PRIVY", "BETEL", "FRISK", "BONGO", "BEGUN", "AZURE", "WEAVE", "GENIE", "SOUND", "GLOVE", "BRAID", "SCOPE", "WRYLY", "ROVER", "ASSAY", "OCEAN", "BLOOM", "IRATE", "LATER", "WOKEN", "SILKY", "WRECK", "DWELT", "SLATE", "SMACK", "SOLID", "AMAZE", "HAZEL", "WRIST", "JOLLY", "GLOBE", "FLINT", "ROUSE", "CIVIL", "VISTA", "RELAX", "COVER", "ALIVE", "BEECH", "JETTY", "BLISS", "VOCAL", "OFTEN", "DOLLY", "EIGHT", "JOKER", "SINCE", "EVENT", "ENSUE", "SHUNT", "DIVER", "POSER", "WORST", "SWEEP", "ALLEY", "CREED", "ANIME", "LEAFY", "BOSOM", "DUNCE", "STARE", "PUDGY", "WAIVE", "CHOIR", "STOOD", "SPOKE", "OUTGO", "DELAY", "BILGE", "IDEAL", "CLASP", "SEIZE", "HOTLY", "LAUGH", "SIEVE", "BLOCK", "MEANT", "GRAPE", "NOOSE", "HARDY", "SHIED", "DRAWL", "DAISY", "PUTTY", "STRUT", "BURNT", "TULIP", "CRICK", "IDYLL", "VIXEN", "FUROR", "GEEKY", "COUGH", "NAIVE", "SHOAL", "STORK", "BATHE", "AUNTY", "CHECK", "PRIME", "BRASS", "OUTER", "FURRY", "RAZOR", "ELECT", "EVICT", "IMPLY", "DEMUR", "QUOTA", "HAVEN", "CAVIL", "SWEAR", "CRUMP", "DOUGH", "GAVEL", "WAGON", "SALON", "NUDGE", "HAREM", "PITCH", "SWORN", "PUPIL", "EXCEL", "STONY", "CABIN", "UNZIP", "QUEEN", "TROUT", "POLYP", "EARTH", "STORM", "UNTIL", "TAPER", "ENTER", "CHILD", "ADOPT", "MINOR", "FATTY", "HUSKY", "BRAVE", "FILET", "SLIME", "GLINT", "TREAD", "STEAL", "REGAL", "GUEST", "EVERY", "MURKY", "SHARE", "SPORE", "HOIST", "BUXOM", "INNER", "OTTER", "DIMLY", "LEVEL", "SUMAC", "DONUT", "STILT", "ARENA", "SHEET", "SCRUB", "FANCY", "SLIMY", "PEARL", "SILLY", "PORCH", "DINGO", "SEPIA", "AMBLE", "SHADY", "BREAD", "FRIAR", "REIGN", "DAIRY", "QUILL", "CROSS", "BROOD", "TUBER", "SHEAR", "POSIT", "BLANK", "VILLA", "SHANK", "PIGGY", "FREAK", "WHICH", "AMONG", "FECAL", "SHELL", "WOULD", "ALGAE", "LARGE", "RABBI", "AGONY", "AMUSE", "BUSHY", "COPSE", "SWOON", "KNIFE", "POUCH", "ASCOT", "PLANE", "CROWN", "URBAN", "SNIDE", "RELAY", "ABIDE", "VIOLA", "RAJAH", "STRAW", "DILLY", "CRASH", "AMASS", "THIRD", "TRICK", "TUTOR", "WOODY", "BLURB", "GRIEF", "DISCO", "WHERE", "SASSY", "BEACH", "SAUNA", "COMIC", "CLUED", "CREEP", "CASTE", "GRAZE", "SNUFF", "FROCK", "GONAD", "DRUNK", "PRONG", "LURID", "STEEL", "HALVE", "BUYER", "VINYL", "UTILE", "SMELL", "ADAGE", "WORRY", "TASTY", "LOCAL", "TRADE", "FINCH", "ASHEN", "MODAL", "GAUNT", "CLOVE", "ENACT", "ADORN", "ROAST", "SPECK", "SHEIK", "MISSY", "GRUNT", "SNOOP", "PARTY", "TOUCH", "MAFIA", "EMCEE", "ARRAY", "SOUTH", "VAPID", "JELLY", "SKULK", "ANGST", "TUBAL", "LOWER", "CREST", "SWEAT", "CYBER", "ADORE", "TARDY", "SWAMI", "NOTCH", "GROOM", "ROACH", "HITCH", "YOUNG", "ALIGN", "READY", "FROND", "STRAP", "PUREE", "REALM", "VENUE", "SWARM", "OFFER", "SEVEN", "DRYER", "DIARY", "DRYLY", "DRANK", "ACRID", "HEADY", "THETA", "JUNTO", "PIXIE", "QUOTH", "BONUS", "SHALT", "PENNE", "AMEND", "DATUM", "BUILD", "PIANO", "SHELF", "LODGE", "SUING", "REARM", "CORAL", "RAMEN", "WORTH", "PSALM", "INFER", "OVERT", "MAYOR", "OVOID", "GLIDE", "USAGE", "POISE", "RANDY", "CHUCK", "PRANK", "FISHY", "TOOTH", "ETHER", "DROVE", "IDLER", "SWATH", "STINT", "WHILE", "BEGAT", "APPLY", "SLANG", "TAROT", "RADAR", "CREDO", "AWARE", "CANON", "SHIFT", "TIMER", "BYLAW", "SERUM", "THREE", "STEAK", "ILIAC", "SHIRK", "BLUNT", "PUPPY", "PENAL", "JOIST", "BUNNY", "SHAPE", "BEGET", "WHEEL", "ADEPT", "STUNT", "STOLE", "TOPAZ", "CHORE", "FLUKE", "AFOOT", "BLOAT", "BULLY", "DENSE", "CAPER", "SNEER", "BOXER", "JUMBO", "LUNGE", "SPACE", "AVAIL", "SHORT", "SLURP", "LOYAL", "FLIRT", "PIZZA", "CONCH", "TEMPO", "DROOP", "PLATE", "BIBLE", "PLUNK", "AFOUL", "SAVOY", "STEEP", "AGILE", "STAKE", "DWELL", "KNAVE", "BEARD", "AROSE", "MOTIF", "SMASH", "BROIL", "GLARE", "SHOVE", "BAGGY", "MAMMY", "SWAMP", "ALONG", "RUGBY", "WAGER", "QUACK", "SQUAT", "SNAKY", "DEBIT", "MANGE", "SKATE", "NINTH", "JOUST", "TRAMP", "SPURN", "MEDAL", "MICRO", "REBEL", "FLANK", "LEARN", "NADIR", "MAPLE", "COMFY", "REMIT", "GRUFF", "ESTER", "LEAST", "MOGUL", "FETCH", "CAUSE", "OAKEN", "AGLOW", "MEATY", "GAFFE", "SHYLY", "RACER", "PROWL", "THIEF", "STERN", "POESY", "ROCKY", "TWEET", "WAIST", "SPIRE", "GROPE", "HAVOC", "PATSY", "TRULY", "FORTY", "DEITY", "UNCLE", "SWISH", "GIVER", "PREEN", "BEVEL", "LEMUR", "DRAFT", "SLOPE", "ANNOY", "LINGO", "BLEAK", "DITTY", "CURLY", "CEDAR", "DIRGE", "GROWN", "HORDE", "DROOL", "SHUCK", "CRYPT", "CUMIN", "STOCK", "GRAVY", "LOCUS", "WIDER", "BREED", "QUITE", "CHAFE", "CACHE", "BLIMP", "DEIGN", "FIEND", "LOGIC", "CHEAP", "ELIDE", "RIGID", "FALSE", "RENAL", "PENCE", "ROWDY", "SHOOT", "BLAZE", "ENVOY", "POSSE", "BRIEF", "NEVER", "ABORT", "MOUSE", "MUCKY", "SULKY", "FIERY", "MEDIA", "TRUNK", "YEAST", "CLEAR", "SKUNK", "SCALP", "BITTY", "CIDER", "KOALA", "DUVET", "SEGUE", "CREME", "SUPER", "GRILL", "AFTER", "OWNER", "EMBER", "REACH", "NOBLY", "EMPTY", "SPEED", "GIPSY", "RECUR", "SMOCK", "DREAD", "MERGE", "BURST", "KAPPA", "AMITY", "SHAKY", "HOVER", "CAROL", "SNORT", "SYNOD", "FAINT", "HAUNT", "FLOUR", "CHAIR", "DETOX", "SHREW", "TENSE", "PLIED", "QUARK", "BURLY", "NOVEL", "WAXEN", "STOIC", "JERKY", "BLITZ", "BEEFY", "LYRIC", "HUSSY", "TOWEL", "QUILT", "BELOW", "BINGO", "WISPY", "BRASH", "SCONE", "TOAST", "EASEL", "SAUCY", "VALUE", "SPICE", "HONOR", "ROUTE", "SHARP", "BAWDY", "RADII", "SKULL", "PHONY", "ISSUE", "LAGER", "SWELL", "URINE", "GASSY", "TRIAL", "FLORA", "UPPER", "LATCH", "WIGHT", "BRICK", "RETRY", "HOLLY", "DECAL", "GRASS", "SHACK", "DOGMA", "MOVER", "DEFER", "SOBER", "OPTIC", "CRIER", "VYING", "NOMAD", "FLUTE", "HIPPO", "SHARK", "DRIER", "OBESE", "BUGLE", "TAWNY", "CHALK", "FEAST", "RUDDY", "PEDAL", "SCARF", "CRUEL", "BLEAT", "TIDAL", "SLUSH", "SEMEN", "WINDY", "DUSTY", "SALLY", "IGLOO", "NERDY", "JEWEL", "SHONE", "WHALE", "HYMEN", "ABUSE", "FUGUE", "ELBOW", "CRUMB", "PANSY", "WELSH", "SYRUP", "TERSE", "SUAVE", "GAMUT", "SWUNG", "DRAKE", "FREED", "AFIRE", "SHIRT", "GROUT", "ODDLY", "TITHE", "PLAID", "DUMMY", "BROOM", "BLIND", "TORCH", "ENEMY", "AGAIN", "TYING", "PESKY", "ALTER", "GAZER", "NOBLE", "ETHOS", "BRIDE", "EXTOL", "DECOR", "HOBBY", "BEAST", "IDIOM", "UTTER", "THESE", "SIXTH", "ALARM", "ERASE", "ELEGY", "SPUNK", "PIPER", "SCALY", "SCOLD", "HEFTY", "CHICK", "SOOTY", "CANAL", "WHINY", "SLASH", "QUAKE", "JOINT", "SWEPT", "PRUDE", "HEAVY", "WIELD", "FEMME", "LASSO", "MAIZE", "SHALE", "SCREW", "SPREE", "SMOKY", "WHIFF", "SCENT", "GLADE", "SPENT", "PRISM", "STOKE", "RIPER", "ORBIT", "COCOA", "GUILT", "HUMUS", "SHUSH", "TABLE", "SMIRK", "WRONG", "NOISY", "ALERT", "SHINY", "ELATE", "RESIN", "WHOLE", "HUNCH", "PIXEL", "POLAR", "HOTEL", "SWORD", "CLEAT", "MANGO", "RUMBA", "PUFFY", "FILLY", "BILLY", "LEASH", "CLOUT", "DANCE", "OVATE", "FACET", "CHILI", "PAINT", "LINER", "CURIO", "SALTY", "AUDIO", "SNAKE", "FABLE", "CLOAK", "NAVEL", "SPURT", "PESTO", "BALMY", "FLASH", "UNWED", "EARLY", "CHURN", "WEEDY", "STUMP", "LEASE", "WITTY", "WIMPY", "SPOOF", "SANER", "BLEND", "SALSA", "THICK", "WARTY", "MANIC", "BLARE", "SQUIB", "SPOON", "PROBE", "CREPE", "KNACK", "FORCE", "DEBUT", "ORDER", "HASTE", "TEETH", "AGENT", "WIDEN", "ICILY", "SLICE", "INGOT", "CLASH", "JUROR", "BLOOD", "ABODE", "THROW", "UNITY", "PIVOT", "SLEPT", "TROOP", "SPARE", "SEWER", "PARSE", "MORPH", "CACTI", "TACKY", "SPOOL", "DEMON", "MOODY", "ANNEX", "BEGIN", "FUZZY", "PATCH", "WATER", "LUMPY", "ADMIN", "OMEGA", "LIMIT", "TABBY", "MACHO", "AISLE", "SKIFF", "BASIS", "PLANK", "VERGE", "BOTCH", "CRAWL", "LOUSY", "SLAIN", "CUBIC", "RAISE", "WRACK", "GUIDE", "FOIST", "CAMEO", "UNDER", "ACTOR", "REVUE", "FRAUD", "HARPY", "SCOOP", "CLIMB", "REFER", "OLDEN", "CLERK", "DEBAR", "TALLY", "ETHIC", "CAIRN", "TULLE", "GHOUL", "HILLY", "CRUDE", "APART", "SCALE", "OLDER", "PLAIN", "SPERM", "BRINY", "ABBOT", "RERUN", "QUEST", "CRISP", "BOUND", "BEFIT", "DRAWN", "SUITE", "ITCHY", "CHEER", "BAGEL", "GUESS", "BROAD", "AXIOM", "CHARD", "CAPUT", "LEANT", "HARSH", "CURSE", "PROUD", "SWING", "OPINE", "TASTE", "LUPUS", "GUMBO", "MINER", "GREEN", "CHASM", "LIPID", "TOPIC", "ARMOR", "BRUSH", "CRANE", "MURAL", "ABLED", "HABIT", "BOSSY", "MAKER", "DUSKY", "DIZZY", "LITHE", "BROOK", "JAZZY", "FIFTY", "SENSE", "GIANT", "SURLY", "LEGAL", "FATAL", "FLUNK", "BEGAN", "PRUNE", "SMALL", "SLANT", "SCOFF", "TORUS", "NINNY", "COVEY", "VIPER", "TAKEN", "MORAL", "VOGUE", "OWING", "TOKEN", "ENTRY", "BOOTH", "VOTER", "CHIDE", "ELFIN", "EBONY", "NEIGH", "MINIM", "MELON", "KNEED", "DECOY", "VOILA", "ANKLE", "ARROW", "MUSHY", "TRIBE", "CEASE", "EAGER", "BIRTH", "GRAPH", "ODDER", "TERRA", "WEIRD", "TRIED", "CLACK", "COLOR", "ROUGH", "WEIGH", "UNCUT", "LADLE", "STRIP", "CRAFT", "MINUS", "DICEY", "TITAN", "LUCID", "VICAR", "DRESS", "DITCH", "GYPSY", "PASTA", "TAFFY", "FLAME", "SWOOP", "ALOOF", "SIGHT", "BROKE", "TEARY", "CHART", "SIXTY", "WORDY", "SHEER", "LEPER", "NOSEY", "BULGE", "SAVOR", "CLAMP", "FUNKY", "FOAMY", "TOXIC", "BRAND", "PLUMB", "DINGY", "BUTTE", "DRILL", "TRIPE", "BICEP", "TENOR", "KRILL", "WORSE", "DRAMA", "HYENA", "THINK", "RATIO", "COBRA", "BASIL", "SCRUM", "BUSED", "PHONE", "COURT", "CAMEL", "PROOF", "HEARD", "ANGEL", "PETAL", "POUTY", "THROB", "MAYBE", "FETAL", "SPRIG", "SPINE", "SHOUT", "CADET", "MACRO", "DODGY", "SATYR", "RARER", "BINGE", "TREND", "NUTTY", "LEAPT", "AMISS", "SPLIT", "MYRRH", "WIDTH", "SONAR", "TOWER", "BARON", "FEVER", "WAVER", "SPARK", "BELIE", "SLOOP", "EXPEL", "SMOTE", "BALER", "ABOVE", "NORTH", "WAFER", "SCANT", "FRILL", "AWASH", "SNACK", "SCOWL", "FRAIL", "DRIFT", "LIMBO", "FENCE", "MOTEL", "OUNCE", "WREAK", "REVEL", "TALON", "PRIOR", "KNELT", "CELLO", "FLAKE", "DEBUG", "ANODE", "CRIME", "SALVE", "SCOUT", "IMBUE", "PINKY", "STAVE", "VAGUE", "CHOCK", "FIGHT", "VIDEO", "STONE", "TEACH", "CLEFT", "FROST", "PRAWN", "BOOTY", "TWIST", "APNEA", "STIFF", "PLAZA", "LEDGE", "TWEAK", "BOARD", "GRANT", "MEDIC", "BACON", "CABLE", "BRAWL", "SLUNK", "RASPY", "FORUM", "DRONE", "WOMEN", "MUCUS", "BOAST", "TODDY", "COVEN", "TUMOR", "TRUER", "WRATH", "STALL", "STEAM", "AXIAL", "PURER", "DAILY", "TRAIL", "NICHE", "MEALY", "JUICE", "NYLON", "PLUMP", "MERRY", "FLAIL", "PAPAL", "WHEAT", "BERRY", "COWER", "ERECT", "BRUTE", "LEGGY", "SNIPE", "SINEW", "SKIER", "PENNY", "JUMPY", "RALLY", "UMBRA", "SCARY", "MODEM", "GROSS", "AVIAN", "GREED", "SATIN", "TONIC", "PARKA", "SNIFF", "LIVID", "STARK", "TRUMP", "GIDDY", "REUSE", "TABOO", "AVOID", "QUOTE", "DEVIL", "LIKEN", "GLOSS", "GAYER", "BERET", "NOISE", "GLAND", "DEALT", "SLING", "RUMOR", "OPERA", "THIGH", "TONGA", "FLARE", "WOUND", "WHITE", "BULKY", "ETUDE", "HORSE", "CIRCA", "PADDY", "INBOX", "FIZZY", "GRAIN", "EXERT", "SURGE", "GLEAM", "BELLE", "SALVO", "CRUSH", "FRUIT", "SAPPY", "TAKER", "TRACT", "OVINE", "SPIKY", "FRANK", "REEDY", "FILTH", "SPASM", "HEAVE", "MAMBO", "RIGHT", "CLANK", "TRUST", "LUMEN", "BORNE", "SPOOK", "SAUCE", "AMBER", "LATHE", "CARAT", "CORER", "DIRTY", "SLYLY", "AFFIX", "ALLOY", "TAINT", "SHEEP", "KINKY", "WOOLY", "MAUVE", "FLUNG", "YACHT", "FRIED", "QUAIL", "BRUNT", "GRIMY", "CURVY", "CAGEY", "RINSE", "DEUCE", "STATE", "GRASP", "MILKY", "BISON", "GRAFT", "SANDY", "BASTE", "FLASK", "HEDGE", "GIRLY", "SWASH", "BONEY", "COUPE", "ENDOW", "ABHOR", "WELCH", "BLADE", "TIGHT", "GEESE", "MISER", "MIRTH", "CLOUD", "CABAL", "LEECH", "CLOSE", "TENTH", "PECAN", "DROIT", "GRAIL", "CLONE", "GUISE", "RALPH", "TANGO", "BIDDY", "SMITH", "MOWER", "PAYEE", "SERIF", "DRAPE", "FIFTH", "SPANK", "GLAZE", "ALLOT", "TRUCK", "KAYAK", "VIRUS", "TESTY", "TEPEE", "FULLY", "ZONAL", "METRO", "CURRY", "GRAND", "BANJO", "AXION", "BEZEL", "OCCUR", "CHAIN", "NASAL", "GOOEY", "FILER", "BRACE", "ALLAY", "PUBIC", "RAVEN", "PLEAD", "GNASH", "FLAKY", "MUNCH", "DULLY", "EKING", "THING", "SLINK", "HURRY", "THEFT", "SHORN", "PYGMY", "RANCH", "WRING", "LEMON", "SHORE", "MAMMA", "FROZE", "NEWER", "STYLE", "MOOSE", "ANTIC", "DROWN", "VEGAN", "CHESS", "GUPPY", "UNION", "LEVER", "LORRY", "IMAGE", "CABBY", "DRUID", "EXACT", "TRUTH", "DOPEY", "SPEAR", "CRIED", "CHIME", "CRONY", "STUNK", "TIMID", "BATCH", "GAUGE", "ROTOR", "CRACK", "CURVE", "LATTE", "WITCH", "BUNCH", "REPEL", "ANVIL", "SOAPY", "METER", "BROTH", "MADLY", "DRIED", "SCENE", "KNOWN", "MAGMA", "ROOST", "WOMAN", "THONG", "PUNCH", "PASTY", "DOWNY", "KNEAD", "WHIRL", "RAPID", "CLANG", "ANGER", "DRIVE", "GOOFY", "EMAIL", "MUSIC", "STUFF", "BLEEP", "RIDER", "MECCA", "FOLIO", "SETUP", "VERSO", "QUASH", "FAUNA", "GUMMY", "HAPPY", "NEWLY", "FUSSY", "RELIC", "GUAVA", "RATTY", "FUDGE", "FEMUR", "CHIRP", "FORTE", "ALIBI", "WHINE", "PETTY", "GOLLY", "PLAIT", "FLECK", "FELON", "GOURD", "BROWN", "THRUM", "FICUS", "STASH", "DECRY", "WISER", "JUNTA", "VISOR", "DAUNT", "SCREE", "IMPEL", "AWAIT", "PRESS", "WHOSE", "TURBO", "STOOP", "SPEAK", "MANGY", "EYING", "INLET", "CRONE", "PULSE", "MOSSY", "STAID", "HENCE", "PINCH", "TEDDY", "SULLY", "SNORE", "RIPEN", "SNOWY", "ATTIC", "GOING", "LEACH", "MOUTH", "HOUND", "CLUMP", "TONAL", "BIGOT", "PERIL", "PIECE", "BLAME", "HAUTE", "SPIED", "UNDID", "INTRO", "BASAL", "RODEO", "GUARD", "STEER", "LOAMY", "SCAMP", "SCRAM", "MANLY", "HELLO", "VAUNT", "ORGAN", "FERAL", "KNOCK", "EXTRA", "CONDO", "ADAPT", "WILLY", "POLKA", "RAYON", "SKIRT", "FAITH", "TORSO", "MATCH", "MERCY", "TEPID", "SLEEK", "RISER", "TWIXT", "PEACE", "FLUSH", "CATTY", "LOGIN", "EJECT", "ROGER", "RIVAL", "UNTIE", "REFIT", "AORTA", "ADULT", "JUDGE", "ROWER", "ARTSY", "RURAL", "SHAVE", "BOBBY", "ECLAT", "FELLA", "GAILY", "HARRY", "HASTY", "HYDRO", "LIEGE", "OCTAL", "OMBRE", "PAYER", "SOOTH", "UNSET", "UNLIT", "VOMIT", "FANNY", "FETUS", "BUTCH", "STALK", "FLACK", "WIDOW", "AUGUR"]
  , B = ["CIGAR", "REBUT", "SISSY", "HUMPH", "AWAKE", "BLUSH", "FOCAL", "EVADE", "NAVAL", "SERVE", "HEATH", "DWARF", "MODEL", "KARMA", "STINK", "GRADE", "QUIET", "BENCH", "ABATE", "FEIGN", "MAJOR", "DEATH", "FRESH", "CRUST", "STOOL", "COLON", "ABASE", "MARRY", "REACT", "BATTY", "PRIDE", "FLOSS", "HELIX", "CROAK", "STAFF", "PAPER", "UNFED", "WHELP", "TRAWL", "OUTDO", "ADOBE", "CRAZY", "SOWER", "REPAY", "DIGIT", "CRATE", "CLUCK", "SPIKE", "MIMIC", "POUND", "MAXIM", "LINEN", "UNMET", "FLESH", "BOOBY", "FORTH", "FIRST", "STAND", "BELLY", "IVORY", "SEEDY", "PRINT", "YEARN", "DRAIN", "BRIBE", "STOUT", "PANEL", "CRASS", "FLUME", "OFFAL", "AGREE", "ERROR", "SWIRL", "ARGUE", "BLEED", "DELTA", "FLICK", "TOTEM", "WOOER", "FRONT", "SHRUB", "PARRY", "BIOME", "LAPEL", "START", "GREET", "GONER", "GOLEM", "LUSTY", "LOOPY", "ROUND", "AUDIT", "LYING", "GAMMA", "LABOR", "ISLET", "CIVIC", "FORGE", "CORNY", "MOULT", "BASIC", "SALAD", "AGATE", "SPICY", "SPRAY", "ESSAY", "FJORD", "SPEND", "KEBAB", "GUILD", "ABACK", "MOTOR", "ALONE", "HATCH", "HYPER", "THUMB", "DOWRY", "OUGHT", "BELCH", "DUTCH", "PILOT", "TWEED", "COMET", "JAUNT", "ENEMA", "STEED", "ABYSS", "GROWL", "FLING", "DOZEN", "BOOZY", "ERODE", "WORLD", "GOUGE", "CLICK", "BRIAR", "GREAT", "ALTAR", "PULPY", "BLURT", "COAST", "DUCHY", "GROIN", "FIXER", "GROUP", "ROGUE", "BADLY", "SMART", "PITHY", "GAUDY", "CHILL", "HERON", "VODKA", "FINER", "SURER", "RADIO", "ROUGE", "PERCH", "RETCH", "WROTE", "CLOCK", "TILDE", "STORE", "PROVE", "BRING", "SOLVE", "CHEAT", "GRIME", "EXULT", "USHER", "EPOCH", "TRIAD", "BREAK", "RHINO", "VIRAL", "CONIC", "MASSE", "SONIC", "VITAL", "TRACE", "USING", "PEACH", "CHAMP", "BATON", "BRAKE", "PLUCK", "CRAZE", "GRIPE", "WEARY", "PICKY", "ACUTE", "FERRY", "ASIDE", "TAPIR", "TROLL", "UNIFY", "REBUS", "BOOST", "TRUSS", "SIEGE", "TIGER", "BANAL", "SLUMP", "CRANK", "GORGE", "QUERY", "DRINK", "FAVOR", "ABBEY", "TANGY", "PANIC", "SOLAR", "SHIRE", "PROXY", "POINT", "ROBOT", "PRICK", "WINCE", "CRIMP", "KNOLL", "SUGAR", "WHACK", "MOUNT", "PERKY", "COULD", "WRUNG", "LIGHT", "THOSE", "MOIST", "SHARD", "PLEAT", "ALOFT", "SKILL", "ELDER", "FRAME", "HUMOR", "PAUSE", "ULCER", "ULTRA", "ROBIN", "CYNIC", "AROMA", "CAULK", "SHAKE", "DODGE", "SWILL", "TACIT", "OTHER", "THORN", "TROVE", "BLOKE", "VIVID", "SPILL", "CHANT", "CHOKE", "RUPEE", "NASTY", "MOURN", "AHEAD", "BRINE", "CLOTH", "HOARD", "SWEET", "MONTH", "LAPSE", "WATCH", "TODAY", "FOCUS", "SMELT", "TEASE", "CATER", "MOVIE", "SAUTE", "ALLOW", "RENEW", "THEIR", "SLOSH", "PURGE", "CHEST", "DEPOT", "EPOXY", "NYMPH", "FOUND", "SHALL", "STOVE", "LOWLY", "SNOUT", "TROPE", "FEWER", "SHAWL", "NATAL", "COMMA", "FORAY", "SCARE", "STAIR", "BLACK", "SQUAD", "ROYAL", "CHUNK", "MINCE", "SHAME", "CHEEK", "AMPLE", "FLAIR", "FOYER", "CARGO", "OXIDE", "PLANT", "OLIVE", "INERT", "ASKEW", "HEIST", "SHOWN", "ZESTY", "TRASH", "LARVA", "FORGO", "STORY", "HAIRY", "TRAIN", "HOMER", "BADGE", "MIDST", "CANNY", "SHINE", "GECKO", "FARCE", "SLUNG", "TIPSY", "METAL", "YIELD", "DELVE", "BEING", "SCOUR", "GLASS", "GAMER", "SCRAP", "MONEY", "HINGE", "ALBUM", "VOUCH", "ASSET", "TIARA", "CREPT", "BAYOU", "ATOLL", "MANOR", "CREAK", "SHOWY", "PHASE", "FROTH", "DEPTH", "GLOOM", "FLOOD", "TRAIT", "GIRTH", "PIETY", "GOOSE", "FLOAT", "DONOR", "ATONE", "PRIMO", "APRON", "BLOWN", "CACAO", "LOSER", "INPUT", "GLOAT", "AWFUL", "BRINK", "SMITE", "BEADY", "RUSTY", "RETRO", "DROLL", "GAWKY", "HUTCH", "PINTO", "EGRET", "LILAC", "SEVER", "FIELD", "FLUFF", "AGAPE", "VOICE", "STEAD", "BERTH", "MADAM", "NIGHT", "BLAND", "LIVER", "WEDGE", "ROOMY", "WACKY", "FLOCK", "ANGRY", "TRITE", "APHID", "TRYST", "MIDGE", "POWER", "ELOPE", "CINCH", "MOTTO", "STOMP", "UPSET", "BLUFF", "CRAMP", "QUART", "COYLY", "YOUTH", "RHYME", "BUGGY", "ALIEN", "SMEAR", "UNFIT", "PATTY", "CLING", "GLEAN", "LABEL", "HUNKY", "KHAKI", "POKER", "GRUEL", "TWICE", "TWANG", "SHRUG", "TREAT", "WASTE", "MERIT", "WOVEN", "NEEDY", "CLOWN", "IRONY", "RUDER", "GAUZE", "CHIEF", "ONSET", "PRIZE", "FUNGI", "CHARM", "GULLY", "INTER", "WHOOP", "TAUNT", "LEERY", "CLASS", "THEME", "LOFTY", "TIBIA", "BOOZE", "ALPHA", "THYME", "DOUBT", "PARER", "CHUTE", "STICK", "TRICE", "ALIKE", "RECAP", "SAINT", "GLORY", "GRATE", "ADMIT", "BRISK", "SOGGY", "USURP", "SCALD", "SCORN", "LEAVE", "TWINE", "STING", "BOUGH", "MARSH", "SLOTH", "DANDY", "VIGOR", "HOWDY", "ENJOY", "VALID", "IONIC", "EQUAL", "FLOOR", "CATCH", "SPADE", "STEIN", "EXIST", "QUIRK", "DENIM", "GROVE", "SPIEL", "MUMMY", "FAULT", "FOGGY", "FLOUT", "CARRY", "SNEAK", "LIBEL", "WALTZ", "APTLY", "PINEY", "INEPT", "ALOUD", "PHOTO", "DREAM", "STALE", "UNITE", "SNARL", "BAKER", "THERE", "GLYPH", "POOCH", "HIPPY", "SPELL", "FOLLY", "LOUSE", "GULCH", "VAULT", "GODLY", "THREW", "FLEET", "GRAVE", "INANE", "SHOCK", "CRAVE", "SPITE", "VALVE", "SKIMP", "CLAIM", "RAINY", "MUSTY", "PIQUE", "DADDY", "QUASI", "ARISE", "AGING", "VALET", "OPIUM", "AVERT", "STUCK", "RECUT", "MULCH", "GENRE", "PLUME", "RIFLE", "COUNT", "INCUR", "TOTAL", "WREST", "MOCHA", "DETER", "STUDY", "LOVER", "SAFER", "RIVET", "FUNNY", "SMOKE", "MOUND", "UNDUE", "SEDAN", "PAGAN", "SWINE", "GUILE", "GUSTY", "EQUIP", "TOUGH", "CANOE", "CHAOS", "COVET", "HUMAN", "UDDER", "LUNCH", "BLAST", "STRAY", "MANGA", "MELEE", "LEFTY", "QUICK", "PASTE", "GIVEN", "OCTET", "RISEN", "GROAN", "LEAKY", "GRIND", "CARVE", "LOOSE", "SADLY", "SPILT", "APPLE", "SLACK", "HONEY", "FINAL", "SHEEN", "EERIE", "MINTY", "SLICK", "DERBY", "WHARF", "SPELT", "COACH", "ERUPT", "SINGE", "PRICE", "SPAWN", "FAIRY", "JIFFY", "FILMY", "STACK", "CHOSE", "SLEEP", "ARDOR", "NANNY", "NIECE", "WOOZY", "HANDY", "GRACE", "DITTO", "STANK", "CREAM", "USUAL", "DIODE", "VALOR", "ANGLE", "NINJA", "MUDDY", "CHASE", "REPLY", "PRONE", "SPOIL", "HEART", "SHADE", "DINER", "ARSON", "ONION", "SLEET", "DOWEL", "COUCH", "PALSY", "BOWEL", "SMILE", "EVOKE", "CREEK", "LANCE", "EAGLE", "IDIOT", "SIREN", "BUILT", "EMBED", "AWARD", "DROSS", "ANNUL", "GOODY", "FROWN", "PATIO", "LADEN", "HUMID", "ELITE", "LYMPH", "EDIFY", "MIGHT", "RESET", "VISIT", "GUSTO", "PURSE", "VAPOR", "CROCK", "WRITE", "SUNNY", "LOATH", "CHAFF", "SLIDE", "QUEER", "VENOM", "STAMP", "SORRY", "STILL", "ACORN", "APING", "PUSHY", "TAMER", "HATER", "MANIA", "AWOKE", "BRAWN", "SWIFT", "EXILE", "BIRCH", "LUCKY", "FREER", "RISKY", "GHOST", "PLIER", "LUNAR", "WINCH", "SNARE", "NURSE", "HOUSE", "BORAX", "NICER", "LURCH", "EXALT", "ABOUT", "SAVVY", "TOXIN", "TUNIC", "PRIED", "INLAY", "CHUMP", "LANKY", "CRESS", "EATER", "ELUDE", "CYCLE", "KITTY", "BOULE", "MORON", "TENET", "PLACE", "LOBBY", "PLUSH", "VIGIL", "INDEX", "BLINK", "CLUNG", "QUALM", "CROUP", "CLINK", "JUICY", "STAGE", "DECAY", "NERVE", "FLIER", "SHAFT", "CROOK", "CLEAN", "CHINA", "RIDGE", "VOWEL", "GNOME", "SNUCK", "ICING", "SPINY", "RIGOR", "SNAIL", "FLOWN", "RABID", "PROSE", "THANK", "POPPY", "BUDGE", "FIBER", "MOLDY", "DOWDY", "KNEEL", "TRACK", "CADDY", "QUELL", "DUMPY", "PALER", "SWORE", "REBAR", "SCUBA", "SPLAT", "FLYER", "HORNY", "MASON", "DOING", "OZONE", "AMPLY", "MOLAR", "OVARY", "BESET", "QUEUE", "CLIFF", "MAGIC", "TRUCE", "SPORT", "FRITZ", "EDICT", "TWIRL", "VERSE", "LLAMA", "EATEN", "RANGE", "WHISK", "HOVEL", "REHAB", "MACAW", "SIGMA", "SPOUT", "VERVE", "SUSHI", "DYING", "FETID", "BRAIN", "BUDDY", "THUMP", "SCION", "CANDY", "CHORD", "BASIN", "MARCH", "CROWD", "ARBOR", "GAYLY", "MUSKY", "STAIN", "DALLY", "BLESS", "BRAVO", "STUNG", "TITLE", "RULER", "KIOSK", "BLOND", "ENNUI", "LAYER", "FLUID", "TATTY", "SCORE", "CUTIE", "ZEBRA", "BARGE", "MATEY", "BLUER", "AIDER", "SHOOK", "RIVER", "PRIVY", "BETEL", "FRISK", "BONGO", "BEGUN", "AZURE", "WEAVE", "GENIE", "SOUND", "GLOVE", "BRAID", "SCOPE", "WRYLY", "ROVER", "ASSAY", "OCEAN", "BLOOM", "IRATE", "LATER", "WOKEN", "SILKY", "WRECK", "DWELT", "SLATE", "SMACK", "SOLID", "AMAZE", "HAZEL", "WRIST", "JOLLY", "GLOBE", "FLINT", "ROUSE", "CIVIL", "VISTA", "RELAX", "COVER", "ALIVE", "BEECH", "JETTY", "BLISS", "VOCAL", "OFTEN", "DOLLY", "EIGHT", "JOKER", "SINCE", "EVENT", "ENSUE", "SHUNT", "DIVER", "POSER", "WORST", "SWEEP", "ALLEY", "CREED", "ANIME", "LEAFY", "BOSOM", "DUNCE", "STARE", "PUDGY", "WAIVE", "CHOIR", "STOOD", "SPOKE", "OUTGO", "DELAY", "BILGE", "IDEAL", "CLASP", "SEIZE", "HOTLY", "LAUGH", "SIEVE", "BLOCK", "MEANT", "GRAPE", "NOOSE", "HARDY", "SHIED", "DRAWL", "DAISY", "PUTTY", "STRUT", "BURNT", "TULIP", "CRICK", "IDYLL", "VIXEN", "FUROR", "GEEKY", "COUGH", "NAIVE", "SHOAL", "STORK", "BATHE", "AUNTY", "CHECK", "PRIME", "BRASS", "OUTER", "FURRY", "RAZOR", "ELECT", "EVICT", "IMPLY", "DEMUR", "QUOTA", "HAVEN", "CAVIL", "SWEAR", "CRUMP", "DOUGH", "GAVEL", "WAGON", "SALON", "NUDGE", "HAREM", "PITCH", "SWORN", "PUPIL", "EXCEL", "STONY", "CABIN", "UNZIP", "QUEEN", "TROUT", "POLYP", "EARTH", "STORM", "UNTIL", "TAPER", "ENTER", "CHILD", "ADOPT", "MINOR", "FATTY", "HUSKY", "BRAVE", "FILET", "SLIME", "GLINT", "TREAD", "STEAL", "REGAL", "GUEST", "EVERY", "MURKY", "SHARE", "SPORE", "HOIST", "BUXOM", "INNER", "OTTER", "DIMLY", "LEVEL", "SUMAC", "DONUT", "STILT", "ARENA", "SHEET", "SCRUB", "FANCY", "SLIMY", "PEARL", "SILLY", "PORCH", "DINGO", "SEPIA", "AMBLE", "SHADY", "BREAD", "FRIAR", "REIGN", "DAIRY", "QUILL", "CROSS", "BROOD", "TUBER", "SHEAR", "POSIT", "BLANK", "VILLA", "SHANK", "PIGGY", "FREAK", "WHICH", "AMONG", "FECAL", "SHELL", "WOULD", "ALGAE", "LARGE", "RABBI", "AGONY", "AMUSE", "BUSHY", "COPSE", "SWOON", "KNIFE", "POUCH", "ASCOT", "PLANE", "CROWN", "URBAN", "SNIDE", "RELAY", "ABIDE", "VIOLA", "RAJAH", "STRAW", "DILLY", "CRASH", "AMASS", "THIRD", "TRICK", "TUTOR", "WOODY", "BLURB", "GRIEF", "DISCO", "WHERE", "SASSY", "BEACH", "SAUNA", "COMIC", "CLUED", "CREEP", "CASTE", "GRAZE", "SNUFF", "FROCK", "GONAD", "DRUNK", "PRONG", "LURID", "STEEL", "HALVE", "BUYER", "VINYL", "UTILE", "SMELL", "ADAGE", "WORRY", "TASTY", "LOCAL", "TRADE", "FINCH", "ASHEN", "MODAL", "GAUNT", "CLOVE", "ENACT", "ADORN", "ROAST", "SPECK", "SHEIK", "MISSY", "GRUNT", "SNOOP", "PARTY", "TOUCH", "MAFIA", "EMCEE", "ARRAY", "SOUTH", "VAPID", "JELLY", "SKULK", "ANGST", "TUBAL", "LOWER", "CREST", "SWEAT", "CYBER", "ADORE", "TARDY", "SWAMI", "NOTCH", "GROOM", "ROACH", "HITCH", "YOUNG", "ALIGN", "READY", "FROND", "STRAP", "PUREE", "REALM", "VENUE", "SWARM", "OFFER", "SEVEN", "DRYER", "DIARY", "DRYLY", "DRANK", "ACRID", "HEADY", "THETA", "JUNTO", "PIXIE", "QUOTH", "BONUS", "SHALT", "PENNE", "AMEND", "DATUM", "BUILD", "PIANO", "SHELF", "LODGE", "SUING", "REARM", "CORAL", "RAMEN", "WORTH", "PSALM", "INFER", "OVERT", "MAYOR", "OVOID", "GLIDE", "USAGE", "POISE", "RANDY", "CHUCK", "PRANK", "FISHY", "TOOTH", "ETHER", "DROVE", "IDLER", "SWATH", "STINT", "WHILE", "BEGAT", "APPLY", "SLANG", "TAROT", "RADAR", "CREDO", "AWARE", "CANON", "SHIFT", "TIMER", "BYLAW", "SERUM", "THREE", "STEAK", "ILIAC", "SHIRK", "BLUNT", "PUPPY", "PENAL", "JOIST", "BUNNY", "SHAPE", "BEGET", "WHEEL", "ADEPT", "STUNT", "STOLE", "TOPAZ", "CHORE", "FLUKE", "AFOOT", "BLOAT", "BULLY", "DENSE", "CAPER", "SNEER", "BOXER", "JUMBO", "LUNGE", "SPACE", "AVAIL", "SHORT", "SLURP", "LOYAL", "FLIRT", "PIZZA", "CONCH", "TEMPO", "DROOP", "PLATE", "BIBLE", "PLUNK", "AFOUL", "SAVOY", "STEEP", "AGILE", "STAKE", "DWELL", "KNAVE", "BEARD", "AROSE", "MOTIF", "SMASH", "BROIL", "GLARE", "SHOVE", "BAGGY", "MAMMY", "SWAMP", "ALONG", "RUGBY", "WAGER", "QUACK", "SQUAT", "SNAKY", "DEBIT", "MANGE", "SKATE", "NINTH", "JOUST", "TRAMP", "SPURN", "MEDAL", "MICRO", "REBEL", "FLANK", "LEARN", "NADIR", "MAPLE", "COMFY", "REMIT", "GRUFF", "ESTER", "LEAST", "MOGUL", "FETCH", "CAUSE", "OAKEN", "AGLOW", "MEATY", "GAFFE", "SHYLY", "RACER", "PROWL", "THIEF", "STERN", "POESY", "ROCKY", "TWEET", "WAIST", "SPIRE", "GROPE", "HAVOC", "PATSY", "TRULY", "FORTY", "DEITY", "UNCLE", "SWISH", "GIVER", "PREEN", "BEVEL", "LEMUR", "DRAFT", "SLOPE", "ANNOY", "LINGO", "BLEAK", "DITTY", "CURLY", "CEDAR", "DIRGE", "GROWN", "HORDE", "DROOL", "SHUCK", "CRYPT", "CUMIN", "STOCK", "GRAVY", "LOCUS", "WIDER", "BREED", "QUITE", "CHAFE", "CACHE", "BLIMP", "DEIGN", "FIEND", "LOGIC", "CHEAP", "ELIDE", "RIGID", "FALSE", "RENAL", "PENCE", "ROWDY", "SHOOT", "BLAZE", "ENVOY", "POSSE", "BRIEF", "NEVER", "ABORT", "MOUSE", "MUCKY", "SULKY", "FIERY", "MEDIA", "TRUNK", "YEAST", "CLEAR", "SKUNK", "SCALP", "BITTY", "CIDER", "KOALA", "DUVET", "SEGUE", "CREME", "SUPER", "GRILL", "AFTER", "OWNER", "EMBER", "REACH", "NOBLY", "EMPTY", "SPEED", "GIPSY", "RECUR", "SMOCK", "DREAD", "MERGE", "BURST", "KAPPA", "AMITY", "SHAKY", "HOVER", "CAROL", "SNORT", "SYNOD", "FAINT", "HAUNT", "FLOUR", "CHAIR", "DETOX", "SHREW", "TENSE", "PLIED", "QUARK", "BURLY", "NOVEL", "WAXEN", "STOIC", "JERKY", "BLITZ", "BEEFY", "LYRIC", "HUSSY", "TOWEL", "QUILT", "BELOW", "BINGO", "WISPY", "BRASH", "SCONE", "TOAST", "EASEL", "SAUCY", "VALUE", "SPICE", "HONOR", "ROUTE", "SHARP", "BAWDY", "RADII", "SKULL", "PHONY", "ISSUE", "LAGER", "SWELL", "URINE", "GASSY", "TRIAL", "FLORA", "UPPER", "LATCH", "WIGHT", "BRICK", "RETRY", "HOLLY", "DECAL", "GRASS", "SHACK", "DOGMA", "MOVER", "DEFER", "SOBER", "OPTIC", "CRIER", "VYING", "NOMAD", "FLUTE", "HIPPO", "SHARK", "DRIER", "OBESE", "BUGLE", "TAWNY", "CHALK", "FEAST", "RUDDY", "PEDAL", "SCARF", "CRUEL", "BLEAT", "TIDAL", "SLUSH", "SEMEN", "WINDY", "DUSTY", "SALLY", "IGLOO", "NERDY", "JEWEL", "SHONE", "WHALE", "HYMEN", "ABUSE", "FUGUE", "ELBOW", "CRUMB", "PANSY", "WELSH", "SYRUP", "TERSE", "SUAVE", "GAMUT", "SWUNG", "DRAKE", "FREED", "AFIRE", "SHIRT", "GROUT", "ODDLY", "TITHE", "PLAID", "DUMMY", "BROOM", "BLIND", "TORCH", "ENEMY", "AGAIN", "TYING", "PESKY", "ALTER", "GAZER", "NOBLE", "ETHOS", "BRIDE", "EXTOL", "DECOR", "HOBBY", "BEAST", "IDIOM", "UTTER", "THESE", "SIXTH", "ALARM", "ERASE", "ELEGY", "SPUNK", "PIPER", "SCALY", "SCOLD", "HEFTY", "CHICK", "SOOTY", "CANAL", "WHINY", "SLASH", "QUAKE", "JOINT", "SWEPT", "PRUDE", "HEAVY", "WIELD", "FEMME", "LASSO", "MAIZE", "SHALE", "SCREW", "SPREE", "SMOKY", "WHIFF", "SCENT", "GLADE", "SPENT", "PRISM", "STOKE", "RIPER", "ORBIT", "COCOA", "GUILT", "HUMUS", "SHUSH", "TABLE", "SMIRK", "WRONG", "NOISY", "ALERT", "SHINY", "ELATE", "RESIN", "WHOLE", "HUNCH", "PIXEL", "POLAR", "HOTEL", "SWORD", "CLEAT", "MANGO", "RUMBA", "PUFFY", "FILLY", "BILLY", "LEASH", "CLOUT", "DANCE", "OVATE", "FACET", "CHILI", "PAINT", "LINER", "CURIO", "SALTY", "AUDIO", "SNAKE", "FABLE", "CLOAK", "NAVEL", "SPURT", "PESTO", "BALMY", "FLASH", "UNWED", "EARLY", "CHURN", "WEEDY", "STUMP", "LEASE", "WITTY", "WIMPY", "SPOOF", "SANER", "BLEND", "SALSA", "THICK", "WARTY", "MANIC", "BLARE", "SQUIB", "SPOON", "PROBE", "CREPE", "KNACK", "FORCE", "DEBUT", "ORDER", "HASTE", "TEETH", "AGENT", "WIDEN", "ICILY", "SLICE", "INGOT", "CLASH", "JUROR", "BLOOD", "ABODE", "THROW", "UNITY", "PIVOT", "SLEPT", "TROOP", "SPARE", "SEWER", "PARSE", "MORPH", "CACTI", "TACKY", "SPOOL", "DEMON", "MOODY", "ANNEX", "BEGIN", "FUZZY", "PATCH", "WATER", "LUMPY", "ADMIN", "OMEGA", "LIMIT", "TABBY", "MACHO", "AISLE", "SKIFF", "BASIS", "PLANK", "VERGE", "BOTCH", "CRAWL", "LOUSY", "SLAIN", "CUBIC", "RAISE", "WRACK", "GUIDE", "FOIST", "CAMEO", "UNDER", "ACTOR", "REVUE", "FRAUD", "HARPY", "SCOOP", "CLIMB", "REFER", "OLDEN", "CLERK", "DEBAR", "TALLY", "ETHIC", "CAIRN", "TULLE", "GHOUL", "HILLY", "CRUDE", "APART", "SCALE", "OLDER", "PLAIN", "SPERM", "BRINY", "ABBOT", "RERUN", "QUEST", "CRISP", "BOUND", "BEFIT", "DRAWN", "SUITE", "ITCHY", "CHEER", "BAGEL", "GUESS", "BROAD", "AXIOM", "CHARD", "CAPUT", "LEANT", "HARSH", "CURSE", "PROUD", "SWING", "OPINE", "TASTE", "LUPUS", "GUMBO", "MINER", "GREEN", "CHASM", "LIPID", "TOPIC", "ARMOR", "BRUSH", "CRANE", "MURAL", "ABLED", "HABIT", "BOSSY", "MAKER", "DUSKY", "DIZZY", "LITHE", "BROOK", "JAZZY", "FIFTY", "SENSE", "GIANT", "SURLY", "LEGAL", "FATAL", "FLUNK", "BEGAN", "PRUNE", "SMALL", "SLANT", "SCOFF", "TORUS", "NINNY", "COVEY", "VIPER", "TAKEN", "MORAL", "VOGUE", "OWING", "TOKEN", "ENTRY", "BOOTH", "VOTER", "CHIDE", "ELFIN", "EBONY", "NEIGH", "MINIM", "MELON", "KNEED", "DECOY", "VOILA", "ANKLE", "ARROW", "MUSHY", "TRIBE", "CEASE", "EAGER", "BIRTH", "GRAPH", "ODDER", "TERRA", "WEIRD", "TRIED", "CLACK", "COLOR", "ROUGH", "WEIGH", "UNCUT", "LADLE", "STRIP", "CRAFT", "MINUS", "DICEY", "TITAN", "LUCID", "VICAR", "DRESS", "DITCH", "GYPSY", "PASTA", "TAFFY", "FLAME", "SWOOP", "ALOOF", "SIGHT", "BROKE", "TEARY", "CHART", "SIXTY", "WORDY", "SHEER", "LEPER", "NOSEY", "BULGE", "SAVOR", "CLAMP", "FUNKY", "FOAMY", "TOXIC", "BRAND", "PLUMB", "DINGY", "BUTTE", "DRILL", "TRIPE", "BICEP", "TENOR", "KRILL", "WORSE", "DRAMA", "HYENA", "THINK", "RATIO", "COBRA", "BASIL", "SCRUM", "BUSED", "PHONE", "COURT", "CAMEL", "PROOF", "HEARD", "ANGEL", "PETAL", "POUTY", "THROB", "MAYBE", "FETAL", "SPRIG", "SPINE", "SHOUT", "CADET", "MACRO", "DODGY", "SATYR", "RARER", "BINGE", "TREND", "NUTTY", "LEAPT", "AMISS", "SPLIT", "MYRRH", "WIDTH", "SONAR", "TOWER", "BARON", "FEVER", "WAVER", "SPARK", "BELIE", "SLOOP", "EXPEL", "SMOTE", "BALER", "ABOVE", "NORTH", "WAFER", "SCANT", "FRILL", "AWASH", "SNACK", "SCOWL", "FRAIL", "DRIFT", "LIMBO", "FENCE", "MOTEL", "OUNCE", "WREAK", "REVEL", "TALON", "PRIOR", "KNELT", "CELLO", "FLAKE", "DEBUG", "ANODE", "CRIME", "SALVE", "SCOUT", "IMBUE", "PINKY", "STAVE", "VAGUE", "CHOCK", "FIGHT", "VIDEO", "STONE", "TEACH", "CLEFT", "FROST", "PRAWN", "BOOTY", "TWIST", "APNEA", "STIFF", "PLAZA", "LEDGE", "TWEAK", "BOARD", "GRANT", "MEDIC", "BACON", "CABLE", "BRAWL", "SLUNK", "RASPY", "FORUM", "DRONE", "WOMEN", "MUCUS", "BOAST", "TODDY", "COVEN", "TUMOR", "TRUER", "WRATH", "STALL", "STEAM", "AXIAL", "PURER", "DAILY", "TRAIL", "NICHE", "MEALY", "JUICE", "NYLON", "PLUMP", "MERRY", "FLAIL", "PAPAL", "WHEAT", "BERRY", "COWER", "ERECT", "BRUTE", "LEGGY", "SNIPE", "SINEW", "SKIER", "PENNY", "JUMPY", "RALLY", "UMBRA", "SCARY", "MODEM", "GROSS", "AVIAN", "GREED", "SATIN", "TONIC", "PARKA", "SNIFF", "LIVID", "STARK", "TRUMP", "GIDDY", "REUSE", "TABOO", "AVOID", "QUOTE", "DEVIL", "LIKEN", "GLOSS", "GAYER", "BERET", "NOISE", "GLAND", "DEALT", "SLING", "RUMOR", "OPERA", "THIGH", "TONGA", "FLARE", "WOUND", "WHITE", "BULKY", "ETUDE", "HORSE", "CIRCA", "PADDY", "INBOX", "FIZZY", "GRAIN", "EXERT", "SURGE", "GLEAM", "BELLE", "SALVO", "CRUSH", "FRUIT", "SAPPY", "TAKER", "TRACT", "OVINE", "SPIKY", "FRANK", "REEDY", "FILTH", "SPASM", "HEAVE", "MAMBO", "RIGHT", "CLANK", "TRUST", "LUMEN", "BORNE", "SPOOK", "SAUCE", "AMBER", "LATHE", "CARAT", "CORER", "DIRTY", "SLYLY", "AFFIX", "ALLOY", "TAINT", "SHEEP", "KINKY", "WOOLY", "MAUVE", "FLUNG", "YACHT", "FRIED", "QUAIL", "BRUNT", "GRIMY", "CURVY", "CAGEY", "RINSE", "DEUCE", "STATE", "GRASP", "MILKY", "BISON", "GRAFT", "SANDY", "BASTE", "FLASK", "HEDGE", "GIRLY", "SWASH", "BONEY", "COUPE", "ENDOW", "ABHOR", "WELCH", "BLADE", "TIGHT", "GEESE", "MISER", "MIRTH", "CLOUD", "CABAL", "LEECH", "CLOSE", "TENTH", "PECAN", "DROIT", "GRAIL", "CLONE", "GUISE", "RALPH", "TANGO", "BIDDY", "SMITH", "MOWER", "PAYEE", "SERIF", "DRAPE", "FIFTH", "SPANK", "GLAZE", "ALLOT", "TRUCK", "KAYAK", "VIRUS", "TESTY", "TEPEE", "FULLY", "ZONAL", "METRO", "CURRY", "GRAND", "BANJO", "AXION", "BEZEL", "OCCUR", "CHAIN", "NASAL", "GOOEY", "FILER", "BRACE", "ALLAY", "PUBIC", "RAVEN", "PLEAD", "GNASH", "FLAKY", "MUNCH", "DULLY", "EKING", "THING", "SLINK", "HURRY", "THEFT", "SHORN", "PYGMY", "RANCH", "WRING", "LEMON", "SHORE", "MAMMA", "FROZE", "NEWER", "STYLE", "MOOSE", "ANTIC", "DROWN", "VEGAN", "CHESS", "GUPPY", "UNION", "LEVER", "LORRY", "IMAGE", "CABBY", "DRUID", "EXACT", "TRUTH", "DOPEY", "SPEAR", "CRIED", "CHIME", "CRONY", "STUNK", "TIMID", "BATCH", "GAUGE", "ROTOR", "CRACK", "CURVE", "LATTE", "WITCH", "BUNCH", "REPEL", "ANVIL", "SOAPY", "METER", "BROTH", "MADLY", "DRIED", "SCENE", "KNOWN", "MAGMA", "ROOST", "WOMAN", "THONG", "PUNCH", "PASTY", "DOWNY", "KNEAD", "WHIRL", "RAPID", "CLANG", "ANGER", "DRIVE", "GOOFY", "EMAIL", "MUSIC", "STUFF", "BLEEP", "RIDER", "MECCA", "FOLIO", "SETUP", "VERSO", "QUASH", "FAUNA", "GUMMY", "HAPPY", "NEWLY", "FUSSY", "RELIC", "GUAVA", "RATTY", "FUDGE", "FEMUR", "CHIRP", "FORTE", "ALIBI", "WHINE", "PETTY", "GOLLY", "PLAIT", "FLECK", "FELON", "GOURD", "BROWN", "THRUM", "FICUS", "STASH", "DECRY", "WISER", "JUNTA", "VISOR", "DAUNT", "SCREE", "IMPEL", "AWAIT", "PRESS", "WHOSE", "TURBO", "STOOP", "SPEAK", "MANGY", "EYING", "INLET", "CRONE", "PULSE", "MOSSY", "STAID", "HENCE", "PINCH", "TEDDY", "SULLY", "SNORE", "RIPEN", "SNOWY", "ATTIC", "GOING", "LEACH", "MOUTH", "HOUND", "CLUMP", "TONAL", "BIGOT", "PERIL", "PIECE", "BLAME", "HAUTE", "SPIED", "UNDID", "INTRO", "BASAL", "RODEO", "GUARD", "STEER", "LOAMY", "SCAMP", "SCRAM", "MANLY", "HELLO", "VAUNT", "ORGAN", "FERAL", "KNOCK", "EXTRA", "CONDO", "ADAPT", "WILLY", "POLKA", "RAYON", "SKIRT", "FAITH", "TORSO", "MATCH", "MERCY", "TEPID", "SLEEK", "RISER", "TWIXT", "PEACE", "FLUSH", "CATTY", "LOGIN", "EJECT", "ROGER", "RIVAL", "UNTIE", "REFIT", "AORTA", "ADULT", "JUDGE", "ROWER", "ARTSY", "RURAL", "SHAVE", "BOBBY", "ECLAT", "FELLA", "GAILY", "HARRY", "HASTY", "HYDRO", "LIEGE", "OCTAL", "OMBRE", "PAYER", "SOOTH", "UNSET", "UNLIT", "VOMIT", "FANNY", "FETUS", "BUTCH", "STALK", "FLACK", "WIDOW", "AUGUR"];
class EE extends a.Component {
    constructor() {
        super(),
        this.state = {
            guesses: [{
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }, {
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }, {
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }, {
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }, {
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }, {
                word: "",
                wordResults: [],
                submitted: !1,
                isProcessing: !1,
                isSuccessWord: !1,
                rowIsDisqualified: !1,
                numberOfValidWordsRemaining: null
            }],
            currentWordIndex: 0,
            currentWordIsLegalPlay: !0,
            gameOver: !1,
            showError: !1,
            errorMessage: "",
            puzzleNumber: this.getPuzzleNumber(),
            targetWord: B[this.getPuzzleNumber() - 1],
            keyboardStatus: {},
            disableKeyboard: !1,
            validWordsRemaining: r,
            cheatModalWordsRemaining: [],
            showCheatModal: !1,
            shouldShowStatisticsModal: !1,
            shouldShowInfoModal: !1,
            shouldShowUndoHistoryModal: !1,
            shouldShowSettingsModal: !1,
            hardModeEnabled: window.localStorage.getItem("hardModeEnabled") === "true",
            undosRemaining: window.localStorage.getItem("hardModeEnabled") === "true" ? 2 : 5,
            undoHistory: [],
            gameResult: "IN PROGRESS",
            isSyncingFromLocalStorage: !1,
            disableToggleHardMode: !1
        },
        this.handleKeyDown = this.handleKeyDown.bind(this),
        this.getWordResults = this.getWordResults.bind(this),
        this.getCurrentWordErrorMessage = this.getCurrentWordErrorMessage.bind(this),
        this.handleOnScreenKeyBoardClick = this.handleOnScreenKeyBoardClick.bind(this),
        this.handleWordFinishedAnimating = this.handleWordFinishedAnimating.bind(this),
        this.getFinalScoreStats = this.getFinalScoreStats.bind(this),
        this.showCheatModal = this.showCheatModal.bind(this),
        this.hideCheatModal = this.hideCheatModal.bind(this),
        this.showStatisticsModal = this.showStatisticsModal.bind(this),
        this.hideStatisticsModal = this.hideStatisticsModal.bind(this),
        this.showInfoModal = this.showInfoModal.bind(this),
        this.hideInfoModal = this.hideInfoModal.bind(this),
        this.showUndoHistoryModal = this.showUndoHistoryModal.bind(this),
        this.hideUndoHistoryModal = this.hideUndoHistoryModal.bind(this),
        this.showSettingsModal = this.showSettingsModal.bind(this),
        this.hideSettingsModal = this.hideSettingsModal.bind(this),
        this.undoWord = this.undoWord.bind(this),
        this.persistToLocalStorage = this.persistToLocalStorage.bind(this),
        this.setStateFromLocalStorage = this.setStateFromLocalStorage.bind(this),
        this.handleFinishSyncingFromLocalStorage = this.handleFinishSyncingFromLocalStorage.bind(this),
        this.toggleHardMode = this.toggleHardMode.bind(this),
        this.selectRandomStartingWord = this.selectRandomStartingWord.bind(this)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown),
        this.setStateFromLocalStorage()
    }
    getPuzzleNumber() {
        return Math.floor((new Date - new Date("05/25/2022")) / (1e3 * 60 * 60 * 24)) + 1
    }
    persistToLocalStorage() {
        const {guesses: S, undosRemaining: A, undoHistory: R, puzzleNumber: I, gameResult: L, hardModeEnabled: O} = this.state;
        window.localStorage.setItem("guesses", JSON.stringify(S)),
        window.localStorage.setItem("undosRemaining", A),
        window.localStorage.setItem("undoHistory", JSON.stringify(R)),
        window.localStorage.setItem("lastAttemptedPuzzle", I);
        const T = L === "WORDLE" || L === "ELIMINATED" || L === "SURVIVED"
          , N = JSON.parse(window.localStorage.getItem("gameStats")) || {
            currentWinStreak: 0,
            maxStreak: 0,
            totalPlayed: 0,
            totalWordles: 0,
            totalSurvivals: 0,
            totalEliminations: 0,
            lastPuzzlePlayed: null
        };
        if (T && I !== N.lastPuzzlePlayed) {
            L === "WORDLE" && (N.currentWinStreak = 0,
            N.totalWordles++),
            L === "ELIMINATED" && (N.currentWinStreak = 0,
            N.totalEliminations++),
            L === "SURVIVED" && (N.currentWinStreak++,
            N.currentWinStreak > N.maxStreak && N.maxStreak++,
            N.totalSurvivals++),
            N.totalPlayed++,
            N.lastPuzzlePlayed = I,
            window.localStorage.setItem("gameStats", JSON.stringify(N));
            try {
                window.gtag("event", "finishedGame", {
                    puzzleNumber: I,
                    gameResult: L,
                    hardModeEnabled: O,
                    undosUsed: R && R.length,
                    validWordRemainingCount: L === "SURVIVED" ? S[5].numberOfValidWordsRemaining : null,
                    guesses: JSON.stringify(S),
                    winStreak: N.currentWinStreak,
                    maxStreak: N.maxStreak,
                    totalPlayed: N.totalPlayed,
                    totalWordles: N.totalWordles,
                    totalSurvivals: N.totalSurvivals,
                    totalEliminations: N.totalEliminations
                })
            } catch {}
        }
    }
    setStateFromLocalStorage() {
        const S = JSON.parse(window.localStorage.getItem("guesses"))
          , A = window.localStorage.getItem("undosRemaining")
          , R = JSON.parse(window.localStorage.getItem("undoHistory"))
          , I = window.localStorage.getItem("lastAttemptedPuzzle")
          , L = this.state.puzzleNumber
          , O = I && Number(I) === L;
        if (!I)
            return this.setState({
                shouldShowInfoModal: !0
            });
        O && S && A && R && this.setState({
            guesses: S,
            undosRemaining: Number(A),
            undoHistory: R,
            isSyncingFromLocalStorage: !0,
            disableToggleHardMode: !0
        })
    }
    toggleHardMode() {
        if (this.state.disableToggleHardMode)
            return this.setState({
                showError: !0,
                errorMessage: "You cannot enable hard mode once a round has started"
            });
        const A = !this.state.hardModeEnabled
          , R = this.state.gameResult === "IN PROGRESS";
        let I = this.state.undosRemaining;
        R && (I = A ? 2 : 5),
        window.localStorage.setItem("hardModeEnabled", A),
        this.setState({
            hardModeEnabled: A,
            undosRemaining: I
        })
    }
    getCurrentWordErrorMessage(S, A) {
        if (A === 0)
            return null;
        const R = this.state.targetWord
          , I = this.state.guesses[A - 1].word
          , L = this.state.guesses[A - 1].wordResults;
        for (var O = 0; O < I.length; O++) {
            const n = I[O]
              , D = L[O] === "HIT"
              , P = S[O] === n;
            if (D && !P)
                return `Must reuse an ${n} as letter ${O + 1}`
        }
        const T = {}
          , N = {}
          , t = {};
        for (var O = 0; O < R.length; O++) {
            const D = R[O];
            T[D] = !0
        }
        for (var O = 0; O < A; O++) {
            const D = this.state.guesses[O].word
              , P = this.state.guesses[O].wordResults;
            for (var U = 0; U < D.length; U++) {
                const C = D[U]
                  , i = P[U];
                T[C] || (N[C] = !0);
                const l = i === "PARTIAL" || i === "MISS"
                  , G = `${C}${U}`;
                l && (t[G] = !0)
            }
        }
        for (var O = 0; O < S.length; O++) {
            const D = S[O];
            if (!!N[D])
                return `You have already eliminated the letter ${D}`
        }
        for (var O = 0; O < S.length; O++) {
            const D = S[O]
              , P = O
              , C = `${D}${P}`;
            if (!!t[C])
                return `You have already guessed the letter ${D} in position ${P + 1}`
        }
        const s = {};
        for (var O = 0; O < I.length; O++) {
            const D = I[O]
              , P = L[O] === "HIT"
              , C = L[O] === "PARTIAL";
            (P || C) && (s[D] = s[D] ? s[D] + 1 : 1)
        }
        const Y = {};
        for (var O = 0; O < S.length; O++) {
            const D = S[O];
            Y[D] = Y[D] ? Y[D] + 1 : 1
        }
        for (var e in s) {
            const n = s[e]
              , D = Y[e] || 0;
            if (n > D)
                return `You must use the letter ${e} at least ${n} times`
        }
        const H = {};
        for (var O = 0; O < A; O++) {
            const D = this.state.guesses[O].word
              , P = this.state.guesses[O].wordResults
              , C = {}
              , i = {};
            for (var U = 0; U < D.length; U++) {
                const o = D[U]
                  , G = P[U];
                G === "HIT" || G === "PARTIAL" ? C[o] = C[o] ? C[o] + 1 : 1 : i[o] = !0
            }
            for (var e in C) {
                const o = C[e];
                i[e] && (H[e] = o)
            }
        }
        for (var e in Y) {
            const D = Y[e]
              , P = H[e];
            if (P && D > P)
                return `You must use the letter ${e} exactly ${P} time${P === 1 ? "" : "s"}`
        }
    }
    getWordResults(R, I) {
        var R = R.toUpperCase()
          , I = I.toUpperCase();
        const L = ["MISS", "MISS", "MISS", "MISS", "MISS"]
          , O = {};
        return R.split("").forEach(T => {}
        ),
        I.split("").forEach(T => {
            O[T] = O[T] ? O[T] + 1 : 1
        }
        ),
        R.split("").forEach( (T, N) => {
            T === I[N] && (L[N] = "HIT",
            O[T] -= 1)
        }
        ),
        R.split("").forEach( (T, N) => {
            !(T === I[N]) && O[T] && (L[N] = "PARTIAL",
            O[T] -= 1)
        }
        ),
        L
    }
    getUpdatedKeyboardStatus(S) {
        let A = {};
        for (var R = 0; R < S.length; R++) {
            const O = S[R]
              , T = {};
            for (var I = 0; I < O.word.length; I++) {
                const N = O.word[I]
                  , t = O.wordResults[I];
                T[N] || (T[N] = t),
                t === "PARTIAL" && (T[N] = "PARTIAL"),
                T[N] === "MISS" && t === "HIT" && (T[N] = "HIT")
            }
            for (var L in T)
                A[L] = T[L]
        }
        return A
    }
    handleKey(S) {
        const A = this.state.disableKeyboard
          , R = this.state.isSyncingFromLocalStorage
          , I = S === "Select Random Word";
        if (R || A && !I)
            return;
        const L = this.state.gameResult === "WORDLE"
          , O = this.state.gameResult === "SURVIVED"
          , T = this.state.gameResult === "ELIMINATED";
        if (L || O || T)
            return;
        if (this.state.gameResult === "TEMPORARILY ELIMINATED")
            return this.setState({
                showError: !0,
                errorMessage: "Your only option is to Undo"
            });
        const t = JSON.parse(JSON.stringify(this.state.guesses))
          , U = this.state.currentWordIndex
          , s = t[U]
          , Y = this.state.targetWord
          , e = s.word.length === 0
          , H = s.word.length === 5;
        if (S === "Backspace" && !e)
            return t[U].word = t[U].word.slice(0, t[U].word.length - 1),
            this.setState({
                guesses: t,
                showError: !1,
                errorMessage: ""
            });
        if ((I || S === "Enter") && H) {
            if (!r.includes(s.word))
                return this.setState({
                    showError: !0,
                    errorMessage: "Word is not valid"
                });
            const D = this.getCurrentWordErrorMessage(s.word, U);
            if (D)
                return this.setState({
                    showError: !0,
                    errorMessage: D
                });
            t[U].submitted = !0,
            t[U].isProcessing = !0,
            t[U].isSuccessWord = s.word === Y;
            const P = this.getWordResults(s.word, Y);
            return t[U].wordResults = P,
            this.setState({
                guesses: t,
                showError: !1,
                errorMessage: "",
                disableKeyboard: !0
            })
        }
        if (/^[a-zA-Z]{1}$/.test(S) && !H)
            return t[U].word += S.toUpperCase(),
            this.setState({
                guesses: t,
                showError: !1,
                errorMessage: ""
            })
    }
    handleKeyDown(S) {
        const A = S.key;
        if (S.key === "Escape")
            return this.setState({
                showCheatModal: !1
            });
        S.key && this.handleKey(A)
    }
    handleOnScreenKeyBoardClick(S, A) {
        document.activeElement.blur();
        let R = S.target.outerText;
        R === "ENTER" && (R = "Enter"),
        A === "DEL" && (R = "Backspace"),
        this.handleKey(R)
    }
    calculateValidWordsRemaining(S) {
        let A = [];
        for (var R = 0; R < r.length; R++) {
            const I = r[R].toUpperCase();
            this.getCurrentWordErrorMessage(I, S) || A.push(I)
        }
        return A
    }
    handleFinishSyncingFromLocalStorage(S, A) {
        let R = null
          , I = 4;
        for (var L = 0; L < this.state.guesses.length; L++)
            this.state.guesses[L].submitted && (R = L);
        R === null ? this.setState({
            isSyncingFromLocalStorage: !1
        }) : S === R && A === I && this.handleWordFinishedAnimating(S)
    }
    handleWordFinishedAnimating(S) {
        const A = JSON.parse(JSON.stringify(this.state.guesses));
        A[S].isProcessing = !1;
        const R = this.getUpdatedKeyboardStatus(A);
        let I = this.calculateValidWordsRemaining(S + 1);
        A[S].numberOfValidWordsRemaining = I.length;
        let L = "IN PROGRESS";
        const O = A[S].word === this.state.targetWord
          , N = A.length - S - 1 >= I.length;
        let t = this.state.undosRemaining;
        const U = N && t === 0
          , s = N && t > 0;
        if (L = S + 1 === A.length && !O ? "SURVIVED" : O ? "WORDLE" : U ? "ELIMINATED" : s ? "TEMPORARILY ELIMINATED" : "IN PROGRESS",
        O || U) {
            I = O ? [] : I;
            for (var e = S + 1; e < A.length; e++)
                A[e].rowIsDisqualified = !0
        }
        return O && (t = 0,
        A[S].numberOfValidWordsRemaining = 0),
        this.setState({
            guesses: A,
            keyboardStatus: R,
            currentWordIndex: S + 1,
            disableKeyboard: !1,
            validWordsRemaining: I,
            gameResult: L,
            undosRemaining: t,
            isSyncingFromLocalStorage: !1,
            disableToggleHardMode: L === "IN PROGRESS" || L === "TEMPORARILY ELIMINATED"
        }, this.persistToLocalStorage)
    }
    getFinalScoreStats() {
        const S = this.state.gameResult === "SURVIVED"
          , {keyboardStatus: A, guesses: R, undoHistory: I} = this.state;
        let L = null
          , O = null;
        if (S) {
            L = 0,
            O = 0;
            for (var T = 0; T < 26; T++) {
                const U = String.fromCharCode(65 + T);
                !A[U] && L++
            }
            for (var N = 0; N < R.length; N++) {
                const U = R[N];
                for (var t = 0; t < U.wordResults.length; t++)
                    U.wordResults[t] === "HIT" && O++
            }
        }
        return {
            unusedLetterCount: L,
            greenTiles: O
        }
    }
    showCheatModal(S) {
        const A = S + 1
          , R = this.calculateValidWordsRemaining(A)
          , I = this.state.targetWord;
        let L = [];
        for (var O = 0; O < R.length; O++) {
            const T = R[O]
              , N = this.getWordResults(T, I);
            L.push({
                word: T,
                wordResults: N
            })
        }
        this.setState({
            showCheatModal: !0,
            cheatModalWordsRemaining: L
        })
    }
    showStatisticsModal() {
        this.setState({
            shouldShowStatisticsModal: !0
        })
    }
    showInfoModal() {
        this.setState({
            shouldShowInfoModal: !0
        })
    }
    showUndoHistoryModal() {
        this.state.undoHistory.length > 0 && this.setState({
            shouldShowUndoHistoryModal: !0
        })
    }
    showSettingsModal() {
        this.setState({
            shouldShowSettingsModal: !0
        })
    }
    hideCheatModal() {
        this.setState({
            showCheatModal: !1,
            cheatModalWordsRemaining: []
        })
    }
    hideStatisticsModal() {
        this.setState({
            shouldShowStatisticsModal: !1
        })
    }
    hideInfoModal() {
        this.setState({
            shouldShowInfoModal: !1
        })
    }
    hideUndoHistoryModal() {
        this.setState({
            shouldShowUndoHistoryModal: !1
        })
    }
    hideSettingsModal() {
        this.setState({
            shouldShowSettingsModal: !1
        })
    }
    undoWord() {
        document.activeElement.blur();
        const S = this.state.gameResult === "WORDLE"
          , A = this.state.gameResult === "SURVIVED"
          , R = this.state.gameResult === "ELIMINATED";
        if (S || A || R)
            return;
        const I = this.state.currentWordIndex
          , L = this.state.undosRemaining;
        if (L === 0)
            return this.setState({
                showError: !0,
                errorMessage: "You have no more Undos remaining. Please just try not to wordle."
            });
        if (I === 0)
            return;
        const O = I - 1
          , T = JSON.parse(JSON.stringify(this.state.guesses))
          , N = JSON.parse(JSON.stringify(this.state.undoHistory));
        N.push({
            word: T[O].word,
            wordResults: T[O].wordResults
        }),
        T[I] = {
            word: "",
            wordResults: [],
            submitted: !1,
            isProcessing: !1,
            isSuccessWord: !1,
            rowIsDisqualified: !1,
            numberOfValidWordsRemaining: null
        },
        T[O] = {
            word: "",
            wordResults: [],
            submitted: !1,
            isProcessing: !1,
            isSuccessWord: !1,
            rowIsDisqualified: !1,
            numberOfValidWordsRemaining: null
        };
        let t = this.calculateValidWordsRemaining(O);
        const U = this.getUpdatedKeyboardStatus(T.slice(0, O));
        return this.setState({
            guesses: T,
            keyboardStatus: U,
            currentWordIndex: O,
            validWordsRemaining: t,
            undosRemaining: L - 1,
            undoHistory: N,
            gameResult: "IN PROGRESS"
        }, this.persistToLocalStorage)
    }
    selectRandomStartingWord() {
        document.activeElement.blur();
        const {currentWordIndex: S, undoHistory: A, puzzleNumber: R, disableKeyboard: I} = this.state
          , L = S === 0 && A && A.length === 0
          , O = JSON.parse(JSON.stringify(this.state.guesses));
        if (L && !I) {
            const T = Math.floor(Math.random() * (B.length - 1))
              , N = R - 1
              , t = T < N ? B[T] : B[T + 1];
            return O[0].word = t,
            this.setState({
                guesses: O,
                disableKeyboard: !0,
                showError: !1,
                errorMessage: ""
            }, this.handleKey.bind(this, "Select Random Word"))
        }
    }
    render() {
        const S = this.state.validWordsRemaining.length
          , A = S > 1e3 ? "green" : S > 100 ? "#c9b458" : S > 25 ? "orange" : "red"
          , R = this.getFinalScoreStats()
          , L = (this.state.gameResult === "WORDLE" || this.state.gameResult === "ELIMINATED" || this.state.gameResult === "SURVIVED") && this.state.undoHistory && this.state.undoHistory.length;
        return E.jsxs("div", {
            className: "App",
            tabIndex: "0",
            children: [E.jsx(k, {
                errorMessage: this.state.errorMessage,
                gameResult: this.state.gameResult,
                guesses: this.state.guesses,
                validWordsRemaining: this.state.validWordsRemaining,
                currentWordIndex: this.state.currentWordIndex,
                showStatisticsModal: this.showStatisticsModal,
                targetWord: this.state.targetWord
            }), E.jsx(v, {
                showStatisticsModal: this.showStatisticsModal,
                showInfoModal: this.showInfoModal,
                showSettingsModal: this.showSettingsModal
            }), E.jsxs("div", {
                className: "in-game-score",
                children: [E.jsxs("div", {
                    className: "valid-words-remaining-container",
                    children: [E.jsx("div", {
                        children: "Valid Words Remaining"
                    }), E.jsx("div", {
                        className: "score-count",
                        style: {
                            color: A
                        },
                        children: this.state.validWordsRemaining.length
                    })]
                }), E.jsxs("div", {
                    children: [E.jsx("div", {
                        children: "Undos Remaining"
                    }), E.jsx("div", {
                        className: L ? "score-count show-undo-link" : "score-count",
                        onClick: this.showUndoHistoryModal,
                        children: this.state.undosRemaining
                    })]
                })]
            }), E.jsx(w, {
                guesses: this.state.guesses,
                handleWordFinishedAnimating: this.handleWordFinishedAnimating,
                handleFinishSyncingFromLocalStorage: this.handleFinishSyncingFromLocalStorage,
                currentGuess: this.state.currentGuess,
                targetWord: this.state.targetWord,
                isSyncingFromLocalStorage: this.state.isSyncingFromLocalStorage,
                gameResult: this.state.gameResult,
                showCheatModal: this.showCheatModal
            }), E.jsx(f, {
                currentWordIndex: this.state.currentWordIndex,
                handleOnScreenKeyBoardClick: this.handleOnScreenKeyBoardClick,
                keyboardStatus: this.state.keyboardStatus,
                undoWord: this.undoWord,
                undosRemaining: this.state.undosRemaining,
                undoHistory: this.state.undoHistory,
                gameResult: this.state.gameResult,
                showUndoHistoryModal: this.showUndoHistoryModal,
                selectRandomStartingWord: this.selectRandomStartingWord
            }), E.jsx(Q, {
                showStatisticsModal: this.showStatisticsModal,
                guesses: this.state.guesses,
                finalScoreStats: R,
                puzzleNumber: this.state.puzzleNumber,
                gameResult: this.state.gameResult,
                undoHistory: this.state.undoHistory,
                targetWord: this.state.targetWord
            }), E.jsx(b, {
                showModal: this.state.shouldShowInfoModal,
                closeModal: this.hideInfoModal
            }), E.jsx(J, {
                showModal: this.state.showCheatModal,
                validWords: this.state.cheatModalWordsRemaining,
                closeModal: this.hideCheatModal,
                targetWord: this.state.targetWord
            }), E.jsx(X, {
                showModal: this.state.shouldShowStatisticsModal,
                validWords: this.state.validWordsRemaining,
                closeModal: this.hideStatisticsModal,
                guesses: this.state.guesses,
                finalScoreStats: R,
                puzzleNumber: this.state.puzzleNumber,
                gameResult: this.state.gameResult,
                undoHistory: this.state.undoHistory
            }), E.jsx(y, {
                showModal: this.state.shouldShowUndoHistoryModal,
                closeModal: this.hideUndoHistoryModal,
                undoHistory: this.state.undoHistory
            }), E.jsx(j, {
                showModal: this.state.shouldShowSettingsModal,
                closeModal: this.hideSettingsModal,
                hardModeEnabled: this.state.hardModeEnabled,
                toggleHardMode: this.toggleHardMode,
                disableToggleHardMode: this.state.disableToggleHardMode,
                gameResult: this.state.gameResult
            })]
        })
    }
}
export {EE as default};
