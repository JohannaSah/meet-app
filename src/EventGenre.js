import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ["#524C9A", "#C9B7AD", "#CED3DC", "#ABA9C3", "#635C51"];

    const getData = () => {
        const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
        const data = genres.map((genre) => {
            const value = events.filter(({summary}) => {
                const summaryWords = summary.split(' ');
                return summaryWords.includes(genre);
            }).length;
            
            return { name: genre, value };
        });
        return data.filter((entry) => entry.value > 0);
    };

    useEffect(() => {
        setData(() => getData());
    }, [events]);

    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={this.getData()}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={89}
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenre;