import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ["#524C9A", "#C9B7AD", "#CED3DC", "#ABA9C3", "#635C51"];

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
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400} >
                <Pie
                    data={getData()}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={89}
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((genre, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>    
    );
};

export default EventGenre;