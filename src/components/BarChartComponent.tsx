import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartComponentProps<T> {
    data: T[];
    xKey: keyof T;
    yKey: keyof T;
    xLabel?: string;
    yLabel?: string;
}

const BarChartComponent = <T,>({ data, xKey, yKey, xLabel = '', yLabel = '' }: BarChartComponentProps<T>) => {
    return (
        <ResponsiveContainer width="100%" height={400} >
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey as string} label={{ value: xLabel, position: 'insideBottom', dy: 8 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey={yKey as string} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
