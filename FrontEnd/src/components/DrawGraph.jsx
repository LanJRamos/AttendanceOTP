import { Chart as ChartJS } from "chart.js/auto"
import { Line } from "react-chartjs-2"

const DrawGraph = () => {
    return(
        <>
                <Line 
                    data={{
                        labels: ["D1", "D2", "D3", "D4","D5","D6","D7","D8","D9","D10"],
                        datasets: [
                            {
                                label: "Day1",
                                data: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
                            },
                            {
                                label: "Day2",
                                data: [7, 8, 9, 9, 8, 7, 8, 8, 8, 8],
                            },
                            {
                                label: "Day3",
                                data: [9, 8, 7, 8, 8, 9, 8, 8, 8, 7],
                            },
                            {
                                label: "Day4",
                                data: [8, 8, 9, 9, 8, 7, 9, 8, 7, 7],
                            },
                            {
                                label: "Day5",
                                data: [8, 8, 9, 8, 8, 8, 8, 9, 8, 8],
                            },
                            {
                                label: "Day6",
                                data: [8, 8, 8, 8, 8, 9, 9, 7, 8, 7],
                            },
                            {
                                label: "Day7",
                                data: [9, 8, 8, 7, 8, 8, 7, 8, 9, 8],
                            },
                            {
                                label: "Day8",
                                data: [8, 9, 8, 8, 7, 8, 8, 9, 7, 8],
                            },
                            {
                                label: "Day9",
                                data: [8, 8, 8, 9, 7, 8, 9, 9, 7, 7],
                            },
                            {
                                label: "Day10",
                                data: [8, 8, 8, 7, 9, 8, 8, 9, 9, 8],
                            },
                        ],
                    }}
                />
        </>
    )
}

export default DrawGraph