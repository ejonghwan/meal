"use client"

import React from 'react'
import { Button } from '@/src/components/common/Button'

interface Props {
    firstString: string;
    className: string;
    onClick?: (any) => void;
}


const UserFirstName = ({ firstString, className, onClick }: Props) => {

    return (
        <>
            <Button type='button' size='none' onClick={onClick} className={className ? className : ''}>
                {firstString}
            </Button>
        </>
    )
}

export default UserFirstName