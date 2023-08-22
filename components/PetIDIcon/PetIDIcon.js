import * as React from "react"
import Svg, { Path, Circle, ClipPath, G, Defs } from "react-native-svg"

const PetIDIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                stroke={props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={20}
                d="M172.5 10H110C54.772 10 10 54.772 10 110v62.5M497.5 10H560c55.228 0 100 44.772 100 100v62.5m0 325V560c0 55.228-44.772 100-100 100h-62.5m-325 0H110c-55.228 0-100-44.772-100-100v-62.5"
            />
            <Path stroke={props.color} strokeWidth={20} d="M335 249v253.5" />
            <Path
                fill={props.color}
                d="M225 296.147c0 35.664 73.333 101.049 110 121.853V248.594c-38 0-110 11.889-110 47.553ZM445 296.147c0 35.664-73.333 101.049-110 121.853V248.594c38 0 110 11.889 110 47.553Z"
            />
            <Path
                stroke={props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={20}
                d="M481 448.826C441.532 482.01 390.6 502 335 502c-55.6 0-106.532-19.99-146-53.174"
            />
            <Circle cx={214} cy={193} r={25} fill={props.color} />
            <Circle cx={456} cy={193} r={25} fill={props.color} />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h670v670H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default PetIDIcon;
