import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { update } from '../lib/script'
import Review from '../component/review'
import ReactContentLoader from '../component/loading_skeleton'

const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const Item = dynamic(() => import('../component/item'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const FormControl = dynamic(() => import('@material-ui/core/FormControl'), { ssr: false });
const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false })
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false })

export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    const [ loading, setLoading ] = useState(true);
    var studentID = '';
    var result =
    {
        stu_id: "n10315071", stu_name: "KevinH_New", order_details: [
            { component_id: '3', component_name: 'Capacitor A', quantity: '5' },
            { component_id: '2', component_name: 'Resistor B', quantity: '3' }
        ]
    };

    // Function when a user click Commit button
    function handleCommit() {
        update(result, (response, status) => {
            if (status === "fail") {
                console.log("Something is wrong")
            } else if (status === "success") {
                console.log("transaction successfully made")
                cookies.remove('order_details');
                cookies.remove('prevID');
            }
        })
    }

    useEffect(() => {
        if (!cookies.get('currentID') && !cookies.get('prevID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])


    if (cookies.get('currentID') || cookies.get('prevID')) {
        studentID = cookies.get('prevID') ? cookies.get('prevID') : cookies.get('currentID');
        return (
            <div>
                <Container maxWidth="sm">
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" alignContent="center">
                        <SignOut />

                        <Typography variant="h6" gutterBottom>
                            Order summary for {studentID}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Review/>
                    </Grid>


                    <Grid container direction="row-reverse" >
                        <Button variant="outlined"
                            onClick={handleCommit}
                            color="primary">COMMIT
                    </Button>
                    </Grid>
                </Container>
                {/* <Item data={result} mobile={true} search={text} /> */}
            </div>

        )
    } else {
        return (
            <div>
                <ByPass message="Log in Please." />
            </div>
        )
    }
}