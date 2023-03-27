import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ["#add8e6", "#276b80", "#44a6c6", "#102c35", "#71bbd4"];

    const getData = () => {
        const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
        const data = genres.map((genre) => {
             const value = events.filter((event) =>
                event.summary.toUpperCase().includes(genre.toUpperCase())).length;
            return { name: genre, value };
        });
        return data.filter((genre) => genre.value > 0);
    };

    useEffect(() => {
        setData(() => getData());
    }, [events]);

    if (!events) {
        return <p>Loading...</p>;
    }

    return (
        <div className="chart-container" style={{ width: '100%', height: 'auto', maxWidth: '600px' }}>
            <PieChart width={500} height={300}>
                <Pie
                    data={getData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((genre, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </div>    
    );
};

export default EventGenre;