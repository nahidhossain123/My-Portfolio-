'use client'
import { JSX, useEffect, useRef } from "react";

export default function LogoDraw(): JSX.Element {
    const pathsRef = useRef<SVGPathElement[]>([]);

    useEffect(() => {
        pathsRef.current.forEach((path, i) => {
            if (!path) return;

            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;

            setTimeout(() => {
                path.style.transition = "stroke-dashoffset 2s ease";
                path.style.strokeDashoffset = "0";
            }, i * 800);
        });
    }, []);

    return (
        <svg
            viewBox="0 0 304 307"
            style={{ width: "400px", height: "auto" }}
        >
            <g>
                <path
                    ref={(el) => {
                        if (el) pathsRef.current[0] = el;
                    }}
                    d="M4.624243,6.103034L4.472011,234.701759l50.030033-36.220786-.593784-91.442637l70.660218,59.378335L24.812874,301.799274L200.572746,100.506718v-95.254767l-53.255756.425541.425541,121.70484L4.624243,6.103034Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                />
                <path
                    ref={(el) => {
                        if (el) pathsRef.current[1] = el;
                    }}
                    d="M102.598496,234.701759L284.296202,21.533534L233.230834,95.756452q69.472652,26.126471,66.503735,102.724521c-2.968917,76.59805-56.409419,93.817768-72.441569,95.599118q-16.03215,1.78135-124.694496,1.78135l-.000008-61.159682Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                />
                <path
                    ref={(el) => {
                        if (el) pathsRef.current[2] = el;
                    }}
                    d="M152,206.157399v50.721265l54.811689-.000001q49.630485-14.725529,47.448925-64.356014c-2.18156-49.630485-19.088649-56.1076-41.449637-65.140317Q200.572752,142.346773,152,206.157399Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                />
            </g>
        </svg>
    );
}