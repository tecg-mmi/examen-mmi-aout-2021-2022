export const settings = {
    birdie: {
        selector: "#birdie",
        gravity: 0.4,
        velocityConstraint: 0.9,
        lift: -18

    },
    background: {
        selector: "#background",
        numberOfItemsPerLine: 4,
        gap: 15,
        color: "rgba(238, 228, 218, 0.35)",
    },
    wall: {
        selector: "#wall",
        speed: 2,
        backgroundColor: "rgb(238, 228, 218)",
        color: "#776e65",
        maxValue: 2,
        minValue: 1
    },
    score: {
        selector: "#score",
        best: {
            selector: "#best"
        }
    }
}