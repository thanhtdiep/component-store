import React, { useState, useEffect } from 'react';
import { Button, Grid, Container, Card, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import CropFreeIcon from '@material-ui/icons/CropFree';
import SearchIcon from '@material-ui/icons/Search';
import ByPass from './component/bypass'

export default function Options() {

    const cookies = new Cookies();
    const router = useRouter();

    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])

    function handleSignOut() {
        cookies.remove('currentID');
        router.push('/');
    }

    function handleSearchText() {
        router.push('/search_text')
    }

    function handleScanner() {
        console.log('Scanner');
    }
    if (cookies.get('currentID')) {
        return (
            <div>

                <Container className="border-2 border-indigo-600 min-h-full" maxWidth="sm" >
                    <Grid container direction="row-reverse" >
                        <Button variant="outlined"
                            onClick={handleSignOut}
                            color="secondary">Sign Out
                    </Button>
                    </Grid>

                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={6}>
                            <Card onClick={handleSearchText}>
                                <Typography align="center">
                                    <SearchIcon />
                                    <h3>Search By Text</h3>
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card onClick={handleScanner}>
                                <Typography align="center">
                                    <CropFreeIcon />
                                    <h3>QR Scan</h3>
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    } else {
        return (
            <ByPass message="Nice Try." />
        );
    }

}