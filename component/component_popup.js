import React from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export default function Popup(props) {
    const cookies = new Cookies();
    // Function to create a Component object
    function createComponent(component_id, component_name, location, quantity, deposit) {
        return { component_id, component_name, location, quantity, deposit };
    }

    return (
        Swal.fire({
            title: props.component_name,
            html: 'ID: ' + props.component_id +
                '<br>Available Quantity: ' + props.quantity +
                '<br>Brand: ' + props.brand +
                '<br>Location: ' + props.location +
                '<br>Deposit item: <input type="checkbox" id="return-item">' +
                '<br>Quantity: <input id="quantity" class="swal2-input" placeholder="Enter the quantity number" value=1> ',

            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Add to cart',
            confirmButtonColor: 'rgb(89, 179, 123)',
            imageUrl: 'https://www.diyelectronics.co.za/store/10512-thickbox_default/resistor-220-ohm-14w-5.jpg',
            imageWidth: 300,
            imageHeight: 400,
            imageAlt: 'Component Image',
            preConfirm: () => {
                return [
                    document.getElementById('quantity').value,
                    document.getElementById('return-item').checked];
            }
        })
            .then((result) => {
                // If a user presses confirm
                if (result.isConfirmed) {
                    // If a user try to input a value smaller than 1, pop up an error and cancel the action
                    if (parseInt(result.value[0]) < 1) {
                        Swal.fire("The minimum quantity is 1", "", "error")
                    } else {
                        // Check if the input value is larger than the current quantity. If so, pop-up an error
                        if ((parseInt(result.value[0]) > props.quantity) && (!result.value[1])) {
                            Swal.fire("Insufficient quantity.", "Please change the amount", "error")
                        } else {
                            // Create new component
                            var newComponent = createComponent(props.component_id, props.component_name, props.location, parseInt(result.value[0]), result.value[1]);

                            // Init an empty order
                            var order = []

                            // If the order_details isn't in cookies, push newComponent into order
                            if (!cookies.get('order_details')) {
                                // Save the current user into a cookie in case a user forgot to commit
                                cookies.set('prevID', cookies.get('currentID'));
                                cookies.set('prevName', cookies.get('studentName'));
                                order.push(newComponent);
                            } else {
                                console.log(result);

                                // Get the current order from cookies
                                order = cookies.get('order_details');
                                // Variable to check if the component is already in the order
                                var check_Duplicate = false;
                                var quantity0 = false;

                                var i = 0;
                                for (let e of order) {
                                    quantity0 = false;
                                    if (e.component_id === newComponent.component_id) {
                                        // Increase the quantity only
                                        e.quantity += parseInt(newComponent.quantity);

                                        // Check if the current state is Return or Withdraw
                                        if (e.quantity > 0) {
                                            e.deposit = true;
                                        } else if (e.quantity < 0) {
                                            e.deposit = false;
                                        } else {
                                            // If quantity is 0, remove from the order
                                            quantity0 = true;
                                        }
                                        check_Duplicate = true;

                                        break;
                                    }
                                    i++;
                                }

                                // If the current quantity is 0, remove from order
                                if (quantity0) {
                                    order.splice(i, 1);
                                } else {
                                    // If this is a new component, push into the order
                                    if (!check_Duplicate) {
                                        order.push(newComponent);
                                    }
                                }


                            }
                            // Set new order
                            cookies.set('order_details', order);

                            // Pop-up to alert that new component is added
                            Swal.fire(
                                'Added!',
                                'The component has been added to your cart.',
                                'success'
                            )
                        }
                    }

                }
            })
    );
}