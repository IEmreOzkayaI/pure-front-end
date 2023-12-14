import {useState, useEffect, useCallback} from 'react';

export const useResponsiveBlock = () => {
    const [responsiveBlock, setResponsiveBlock] = useState(window.innerWidth >= 1440);

    const handleResize = useCallback(() => {
        setResponsiveBlock(window.innerWidth >= 1440);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return responsiveBlock;
};