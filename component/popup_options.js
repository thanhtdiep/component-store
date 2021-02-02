import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export default function PopupOptions(studentID) {
    const cookies = new Cookies();

    // Function to Sign out
    function handleSignOut() {
        cookies.remove('currentID');
        window.location = '/';
    }

    // Function to redirect to Search page
    function handleSearchText() {
        window.location = '/search';

    }

    // Function to redirect to Scan page
    function handleScanner() {
        window.location = '/scanner';

    }
    return (
        Swal.fire({
            icon: 'success',
            title: 'Signed In As ' + studentID,
            text: 'What do you want to do next?',
            showCloseButton: true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Search By Name`,
            cancelButtonText: `Sign Out`,
            denyButtonText: `Scan QR Code`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleSearchText();
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                handleScanner();
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                handleSignOut();
                Swal.fire('Signed Out', '', 'info');
            }
        })
    );
}