"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ProductionStartData = {
    _id: string;
    productCount: number;
    action: string;
    timestamp: string;
    userEmail: string;
};

type ProductionStopData = {
    _id: string;
    action: string;
    timestamp: string;
    userEmail: string;
};

const Page = () => {
    const [startData, setStartData] = useState<ProductionStartData[]>([]);
    const [stopData, setStopData] = useState<ProductionStopData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/getData");
                const result = await response.json();
                setStartData(result.productionStarts);
                setStopData(result.productionStops);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const chartData = {
        labels: startData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: "Production Count",
                data: startData.map((d) => d.productCount),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6">
            <div className="mb-4">
                <a
                    href="/dashboard"
                    className="text-base font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer"
                >
                    dashboard
                </a>
                <> / </>
                <a
                    href="/dashboard/analytics"
                    className="text-text-base font-semibold text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer"
                >
                    analytics
                </a>
            </div>

            <h2 className="text-2xl font-semibold">Production Analytics Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
                Production operation statistics for analysis.
            </p>

            {/* Graph Container */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mt-6 w-full max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Production Trend</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <Line data={chartData} />
                    </div>
                )}
            </div>

            {/* Latest start & stop */}
            <div className="mt-6 w-full max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Latest Actions</h3>

                {startData.length > 0 && (
                    <div className="bg-green-100 dark:bg-green-800 p-4 rounded-md mb-4 shadow-md">
                        <p className="text-lg">Latest Start</p>
                        <p className="text-sm">User: {startData[0].userEmail}</p>
                        <p className="text-sm">Product Count: {startData[0].productCount}</p>
                        <p className="text-sm">{new Date(startData[0].timestamp).toLocaleString()}</p>
                    </div>
                )}

                {stopData.length > 0 && (
                    <div className="bg-red-100 dark:bg-red-800 p-4 rounded-md mb-4 shadow-md">
                        <p className="text-lg">Latest Stop</p>
                        <p className="text-sm">User: {stopData[0].userEmail}</p>
                        <p className="text-sm">{new Date(stopData[0].timestamp).toLocaleString()}</p>
                    </div>
                )}
            </div>

            {/* Collapsible rec tbl */}
            <div className="mt-6 w-full max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Production History</h3>

                {/* prod start record */}
                <Accordion className="mt-4">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <p className="text-lg">Production Start Records</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper} className="overflow-x-auto">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell align="right">Product Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {startData.slice(1).map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                            <TableCell>{row.userEmail}</TableCell>
                                            <TableCell align="right">{row.productCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>

                {/* prod stopped record */}
                <Accordion className="mt-4">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <p className="text-lg">Production Stop Records</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper} className="overflow-x-auto">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stopData.slice(1).map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                            <TableCell>{row.userEmail}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default Page;