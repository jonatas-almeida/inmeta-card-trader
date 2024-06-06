export default interface Alert {
    id: string;
    label: string;
    description: string;
    kind: string;
    duration?: number;
}