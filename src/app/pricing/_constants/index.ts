import { Boxes, Globe, RefreshCcw, Shield } from "lucide-react";

export const ENTERPRISE_FEATURES = [
    {
        icon: Globe,
        label: "Global Infrastructure",
        desc: "Experience ultra-fast execution with a network of worldwide edge nodes.",
    },
    {
        icon: Shield,
        label: "Enterprise Security",
        desc: "Benefit from bank-level encryption and advanced security protocols.",
    },
    {
        icon: RefreshCcw,
        label: "Real-time Sync",
        desc: "Enjoy seamless synchronization across all your devices instantly.",
    },
    {
        icon: Boxes,
        label: "Unlimited Storage",
        desc: "Save limitless snippets and projects without storage constraints.",
    },
];

export const FEATURES = {
    development: [
        "AI-powered tools for smarter coding",
        "Customizable theme builder",
        "Built-in debugging support",
        "Multi-language compatibility",
    ],
    collaboration: [
        "Real-time pair programming sessions",
        "Dedicated team workspaces",
        "Integrated version control",
        "Streamlined code review process",
    ],
    deployment: [
        "Effortless one-click deployment",
        "CI/CD workflow automation",
        "Full containerization support",
        "Custom domain integration",
    ],
};
