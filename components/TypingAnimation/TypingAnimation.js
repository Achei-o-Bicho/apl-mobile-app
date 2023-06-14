import React, { useEffect, useRef, useState } from 'react'
import { DotView, MainView } from './Style'
import { Animated } from 'react-native';

export default function TypingAnimation({ color, time, count = 3 }) {
    const dotQuantity = Array.from(Array(count).keys())
    const dotAnimation = dotQuantity.map(() => useRef(new Animated.Value(0)).current);

    useEffect(() => {
        dotAnimation.forEach((animation, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: time,
                        useNativeDriver: true,
                        delay: index * 100
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: time,
                        useNativeDriver: true
                    })
                ]), {
                iterations: -1
            }).start();
        })
    }, [])

    return (
        <MainView>
            {dotAnimation.map((animation, index) => {
                return <DotView
                    color={color}
                    style={{
                        opacity: animation
                    }}
                    key={index}
                />
            })}
        </MainView>
    )
}