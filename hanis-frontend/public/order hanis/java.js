/* =========================================================
   HANI'S CAKES EVENTS 'N' MORE
   JAVASCRIPT
   Existing functionality + shopping cart + payment
========================================================= */


/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1000);

});


/* ================= MOBILE MENU ================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        () => {

            menuBtn.classList.toggle(
                "active"
            );

            nav.classList.toggle(
                "active"
            );

        }
    );

}


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            menuBtn?.classList.remove(
                "active"
            );

            nav?.classList.remove(
                "active"
            );

        }
    );

});


/* ================= HEADER SCROLL ================= */

const header =
    document.getElementById("header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* ================= ACTIVE NAV ================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 180;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                        sectionTop &&
                    window.scrollY <
                        sectionTop +
                        sectionHeight
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   CAKE MODAL
========================================================= */

const cakeCards =
    document.querySelectorAll(
        ".cake-card"
    );


const cakeModal =
    document.getElementById(
        "cakeModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalPrice =
    document.getElementById(
        "modalPrice"
    );


const modalWhatsapp =
    document.getElementById(
        "modalWhatsapp"
    );


const modalAddToCart =
    document.getElementById(
        "modalAddToCart"
    );


let activeProduct = null;


/* ================= FORMAT PRICE ================= */

function formatNaira(amount) {

    return `₦${Number(
        amount
    ).toLocaleString("en-NG")}`;

}


/* ================= GET PRODUCT ================= */

function productFromCard(card) {

    return {

        id:
            String(
                card.dataset.productId
            ),

        title:
            card.dataset.title,

        description:
            card.dataset.description,

        image:
            card.dataset.image,

        price:
            Number(
                card.dataset.price
            ) || 0

    };

}


/* ================= OPEN CAKE MODAL ================= */

function openCakeModal(product) {

    activeProduct = product;


    if (modalImage) {

        modalImage.src =
            product.image;

        modalImage.alt =
            product.title;

    }


    if (modalTitle) {

        modalTitle.textContent =
            product.title;

    }


    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    if (modalPrice) {

        modalPrice.textContent =
            formatNaira(
                product.price
            );

    }


    const message =
        `Hello HANI'S CAKES EVENTS 'N' MORE, I am interested in the "${product.title}" cake/product. I would like to make an enquiry.`;


    if (modalWhatsapp) {

        modalWhatsapp.href =
            `https://wa.me/2348147024101?text=${encodeURIComponent(
                message
            )}`;

    }


    cakeModal?.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* ================= CAKE CARD CLICK ================= */

cakeCards.forEach(
    card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".add-to-cart-btn"
                    )
                ) {

                    return;

                }


                openCakeModal(
                    productFromCard(
                        card
                    )
                );

            }
        );


        const addButton =
            card.querySelector(
                ".add-to-cart-btn"
            );


        addButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                addToCart(
                    productFromCard(
                        card
                    )
                );

            }
        );

    }
);


/* ================= CLOSE CAKE MODAL ================= */

function closeCakeModal() {

    cakeModal?.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


modalClose?.addEventListener(
    "click",
    closeCakeModal
);


cakeModal?.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            closeCakeModal();

        }

    }
);


/* ================= MODAL ADD TO CART ================= */

modalAddToCart?.addEventListener(
    "click",
    () => {

        if (!activeProduct) return;


        addToCart(
            activeProduct
        );


        closeCakeModal();

    }
);


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            cakeModal?.classList.contains(
                "active"
            )
        ) {

            closeCakeModal();

        }


        if (
            cartDrawer?.classList.contains(
                "active"
            )
        ) {

            closeCart();

        }


        if (
            checkoutModal?.classList.contains(
                "active"
            )
        ) {

            closeCheckout();

        }

    }
);


/* =========================================================
   VIEW MORE
========================================================= */

const cakeGrid =
    document.querySelector(
        ".cake-grid"
    );


const viewMoreBtn =
    document.getElementById(
        "viewMoreBtn"
    );


viewMoreBtn?.addEventListener(
    "click",
    () => {

        const showingAll =
            cakeGrid.classList.toggle(
                "show-all"
            );


        viewMoreBtn.innerHTML =
            showingAll

                ? `Show Less <i class="fa-solid fa-chevron-up"></i>`

                : `View More <i class="fa-solid fa-chevron-down"></i>`;


        if (!showingAll) {

            document
                .getElementById(
                    "cakes"
                )
                ?.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

        }

    }
);


/* =========================================================
   SHOPPING CART
========================================================= */

const CART_KEY =
    "hanisCakesCart";


let cart =
    loadCart();


const cartButton =
    document.getElementById(
        "cartButton"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );


const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );


const cartClose =
    document.getElementById(
        "cartClose"
    );


const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartEmpty =
    document.getElementById(
        "cartEmpty"
    );


const cartSubtotal =
    document.getElementById(
        "cartSubtotal"
    );


const clearCartBtn =
    document.getElementById(
        "clearCartBtn"
    );


const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


/* ================= LOAD CART ================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                CART_KEY
            );


        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.warn(
            "Could not load cart:",
            error
        );


        return [];

    }

}


/* ================= SAVE CART ================= */

function saveCart() {

    try {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(
                cart
            )
        );

    } catch (error) {

        console.warn(
            "Could not save cart:",
            error
        );

    }

}


/* ================= CART QUANTITY ================= */

function cartQuantity() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                item.quantity
            );

        },
        0
    );

}


/* ================= CART TOTAL ================= */

function cartTotal() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                item.price *
                item.quantity
            );

        },
        0
    );

}


/* ================= CART BADGE ================= */

function updateCartBadge() {

    if (!cartCount) return;


    cartCount.textContent =
        cartQuantity();

}


/* ================= ADD TO CART ================= */

function addToCart(product) {

    const existing =
        cart.find(
            item =>
                item.id ===
                product.id
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    updateCartBadge();

    openCart();

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            product =>
                product.id === id
        );


    if (!item) return;


    item.quantity +=
        amount;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveCart();

    renderCart();

    updateCartBadge();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveCart();

    renderCart();

    updateCartBadge();

}


/* ================= ESCAPE HTML ================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* ================= RENDER CART ================= */

function renderCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    const hasItems =
        cart.length > 0;


    if (cartEmpty) {

        cartEmpty.style.display =
            hasItems
                ? "none"
                : "block";

    }


    cartItems.style.display =
        hasItems
            ? "block"
            : "none";


    if (checkoutBtn) {

        checkoutBtn.disabled =
            !hasItems;


        checkoutBtn.style.opacity =
            hasItems
                ? "1"
                : "0.5";

    }


    if (clearCartBtn) {

        clearCartBtn.style.display =
            hasItems
                ? "block"
                : "none";

    }


    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatNaira(
                cartTotal()
            );

    }


    if (!hasItems) return;


    cart.forEach(
        item => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <img
                    class="cart-item-image"
                    src="${escapeHtml(
                        item.image
                    )}"
                    alt="${escapeHtml(
                        item.title
                    )}"
                >

                <div>

                    <h4>
                        ${escapeHtml(
                            item.title
                        )}
                    </h4>

                    <div class="cart-item-price">
                        ${formatNaira(
                            item.price
                        )} each
                    </div>

                    <div class="cart-item-controls">

                        <button
                            class="qty-btn"
                            data-action="minus"
                            data-id="${item.id}"
                            type="button"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            class="qty-btn"
                            data-action="plus"
                            data-id="${item.id}"
                            type="button"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${item.id}"
                        type="button"
                    >
                        Remove
                    </button>

                </div>

                <strong class="cart-item-total">

                    ${formatNaira(
                        item.price *
                        item.quantity
                    )}

                </strong>

            `;


            cartItems.appendChild(
                element
            );

        }
    );

}


/* ================= CART BUTTONS ================= */

cartItems?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) return;


        const id =
            button.dataset.id;


        const action =
            button.dataset.action;


        if (
            action === "plus"
        ) {

            changeQuantity(
                id,
                1
            );

        }


        if (
            action === "minus"
        ) {

            changeQuantity(
                id,
                -1
            );

        }


        if (
            action === "remove"
        ) {

            removeFromCart(
                id
            );

        }

    }
);


/* ================= OPEN CART ================= */

function openCart() {

    if (!cartDrawer) return;


    cartDrawer.classList.add(
        "active"
    );


    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* ================= CLOSE CART ================= */

function closeCart() {

    if (!cartDrawer) return;


    cartDrawer.classList.remove(
        "active"
    );


    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

}


cartButton?.addEventListener(
    "click",
    openCart
);


cartClose?.addEventListener(
    "click",
    closeCart
);


cartOverlay?.addEventListener(
    "click",
    closeCart
);


/* ================= CLEAR CART ================= */

clearCartBtn?.addEventListener(
    "click",
    () => {

        cart = [];


        saveCart();

        renderCart();

        updateCartBadge();

    }
);


/* =========================================================
   CHECKOUT
========================================================= */

const checkoutModal =
    document.getElementById(
        "checkoutModal"
    );


const checkoutOverlay =
    document.getElementById(
        "checkoutOverlay"
    );


const checkoutClose =
    document.getElementById(
        "checkoutClose"
    );


const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );


const checkoutFee =
    document.getElementById(
        "checkoutFee"
    );


const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


const fulfilmentLabel =
    document.getElementById(
        "fulfilmentLabel"
    );


const addressField =
    document.getElementById(
        "addressField"
    );


const customerAddress =
    document.getElementById(
        "customerAddress"
    );


/*
    DELIVERY FEE

    Change this number whenever
    you want to change the delivery fee.
*/

const DELIVERY_FEE =
    5000;


/* ================= FULFILMENT ================= */

function getFulfilment() {

    return document
        .querySelector(
            'input[name="fulfilment"]:checked'
        )
        ?.value
        || "delivery";

}


/* ================= CHECKOUT TOTALS ================= */

function updateCheckoutTotals() {

    const subtotal =
        cartTotal();


    const fulfilment =
        getFulfilment();


    const fee =
        fulfilment === "delivery"
            ? DELIVERY_FEE
            : 0;


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            formatNaira(
                subtotal
            );

    }


    if (checkoutFee) {

        checkoutFee.textContent =
            formatNaira(
                fee
            );

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatNaira(
                subtotal +
                fee
            );

    }


    if (fulfilmentLabel) {

        fulfilmentLabel.textContent =
            fulfilment === "delivery"
                ? "Delivery fee"
                : "Pickup fee";

    }

}


/* ================= OPEN CHECKOUT ================= */

function openCheckout() {

    if (!cart.length) return;


    closeCart();


    updateCheckoutTotals();


    checkoutModal?.classList.add(
        "active"
    );


    checkoutModal?.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


checkoutBtn?.addEventListener(
    "click",
    openCheckout
);


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    checkoutModal?.classList.remove(
        "active"
    );


    checkoutModal?.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


checkoutClose?.addEventListener(
    "click",
    closeCheckout
);


checkoutOverlay?.addEventListener(
    "click",
    closeCheckout
);


/* ================= DELIVERY / PICKUP ================= */

document
    .querySelectorAll(
        'input[name="fulfilment"]'
    )
    .forEach(
        radio => {

            radio.addEventListener(
                "change",
                () => {

                    const delivery =
                        getFulfilment() ===
                        "delivery";


                    if (addressField) {

                        addressField.style.display =
                            delivery
                                ? "grid"
                                : "none";

                    }


                    if (customerAddress) {

                        customerAddress.required =
                            delivery;

                    }


                    updateCheckoutTotals();

                }
            );

        }
    );


/* =========================================================
   CHECKOUT SUBMISSION
   MANUAL BANK TRANSFER PAYMENT
========================================================= */

checkoutForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!cart.length) return;


        const formData =
            new FormData(
                checkoutForm
            );


        const fulfilment =
            formData.get(
                "fulfilment"
            );


        const deliveryFee =
            fulfilment === "delivery"
                ? DELIVERY_FEE
                : 0;


        const subtotal =
            cartTotal();


        const total =
            subtotal +
            deliveryFee;


        const customerName =
            formData.get(
                "name"
            ) || "";


        const customerPhone =
            formData.get(
                "phone"
            ) || "";


        const customerEmail =
            formData.get(
                "email"
            ) || "";


        const customerAddressValue =
            formData.get(
                "address"
            ) || "";


        const customerNote =
            formData.get(
                "note"
            ) || "";


        /*
            Generate an order number.
        */

        const orderNumber =
            "HANI-" +
            Date.now()
                .toString()
                .slice(-6);


        /*
            Save the order temporarily
            in case the customer goes back.
        */

        const order = {

            orderNumber:

                orderNumber,


            customer: {

                name:
                    customerName,

                phone:
                    customerPhone,

                email:
                    customerEmail,

                address:
                    customerAddressValue,

                note:
                    customerNote

            },


            fulfilment:
                fulfilment,


            items:
                cart.map(
                    item => ({

                        title:
                            item.title,

                        quantity:
                            item.quantity,

                        price:
                            item.price

                    })
                ),


            subtotal:
                subtotal,


            deliveryFee:
                deliveryFee,


            total:
                total

        };


        sessionStorage.setItem(
            "hanisPendingOrder",
            JSON.stringify(
                order
            )
        );


        showPaymentScreen(
            order
        );

    }
);


/* =========================================================
   PAYMENT SCREEN
========================================================= */

function showPaymentScreen(order) {

    /*
        Hide checkout form.
    */

    if (checkoutForm) {

        checkoutForm.style.display =
            "none";

    }


    /*
        Find existing payment screen
        or create one.
    */

    let paymentScreen =
        document.getElementById(
            "hanisPaymentScreen"
        );


    if (!paymentScreen) {

        paymentScreen =
            document.createElement(
                "div"
            );


        paymentScreen.id =
            "hanisPaymentScreen";


        paymentScreen.className =
            "hanis-payment-screen";


        /*
            Put it inside the checkout
            content area.
        */

        if (
            checkoutForm?.parentElement
        ) {

            checkoutForm.parentElement.appendChild(
                paymentScreen
            );

        } else if (
            checkoutModal
        ) {

            checkoutModal.appendChild(
                paymentScreen
            );

        } else {

            document.body.appendChild(
                paymentScreen
            );

        }

    }


    /*
        PAYMENT SCREEN
    */

    paymentScreen.innerHTML = `

        <div class="payment-header">

            <span class="eyebrow">
                PAYMENT
            </span>

            <h2>
                Complete your payment
            </h2>

            <p>
                Transfer the exact amount below
                from your bank app to the
                HANI'S CAKES account.
            </p>

        </div>


        <div class="payment-order-number">

            <span>
                Order Number
            </span>

            <strong>
                ${escapeHtml(
                    order.orderNumber
                )}
            </strong>

        </div>


        <div class="payment-amount-box">

            <span>
                Amount to pay
            </span>

            <strong>
                ${formatNaira(
                    order.total
                )}
            </strong>

        </div>


        <div class="bank-details-card">

            <div class="bank-detail">

                <span>
                    Bank
                </span>

                <strong>
                    Opay
                </strong>

            </div>


            <div class="bank-detail">

                <span>
                    Account Name
                </span>

                <strong>
                    Ndidi Chinonso Favour
                </strong>

            </div>


            <div class="bank-detail account-number-row">

                <div>

                    <span>
                        Account Number
                    </span>

                    <strong
                        id="hanisAccountNumber"
                    >
                        7011013845
                    </strong>

                </div>


                <button
                    type="button"
                    id="copyAccountNumber"
                    class="copy-account-btn"
                >

                    <i
                        class="fa-regular fa-copy"
                    ></i>

                    Copy

                </button>

            </div>

        </div>


        <div class="payment-warning">

            <i
                class="fa-solid fa-shield-halved"
            ></i>

            <div>

                <strong>
                    Stay safe
                </strong>

                <p>
                    Make the transfer using your
                    own bank app. Never give anyone
                    your PIN, password or OTP.
                </p>

            </div>

        </div>


        <div class="payment-instructions">

            <h3>
                After payment
            </h3>

            <p>
                Once you have completed the transfer,
                click the button below. WhatsApp will
                open with your order details already
                prepared. Attach your payment screenshot
                and send it to HANI'S CAKES for
                confirmation.
            </p>

        </div>


        <div class="payment-actions">

            <button
                type="button"
                id="paymentWhatsappBtn"
                class="btn btn-primary payment-whatsapp-btn"
            >

                <i
                    class="fa-brands fa-whatsapp"
                ></i>

                I've Made Payment —
                Send Screenshot

            </button>


            <button
                type="button"
                id="backToCheckoutBtn"
                class="payment-back-btn"
            >

                <i
                    class="fa-solid fa-arrow-left"
                ></i>

                Back to Order Details

            </button>

        </div>

    `;


    paymentScreen.style.display =
        "block";


    /*
        Scroll payment section
        into view.
    */

    paymentScreen.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });


    /* =====================================================
       COPY ACCOUNT NUMBER
    ===================================================== */

    const copyButton =
        document.getElementById(
            "copyAccountNumber"
        );


    copyButton?.addEventListener(
        "click",
        async () => {

            const accountNumber =
                "8169491179";


            try {

                await navigator.clipboard.writeText(
                    accountNumber
                );


                copyButton.innerHTML = `

                    <i
                        class="fa-solid fa-check"
                    ></i>

                    Copied

                `;


                setTimeout(
                    () => {

                        copyButton.innerHTML = `

                            <i
                                class="fa-regular fa-copy"
                            ></i>

                            Copy

                        `;

                    },
                    2000
                );


            } catch (error) {

                alert(
                    "Account number: " +
                    accountNumber
                );

            }

        }
    );


    /* =====================================================
       WHATSAPP PAYMENT CONFIRMATION
    ===================================================== */

    const whatsappButton =
        document.getElementById(
            "paymentWhatsappBtn"
        );


    whatsappButton?.addEventListener(
        "click",
        () => {

            let itemsText = "";


            order.items.forEach(
                item => {

                    itemsText +=
                        `• ${item.title} x${item.quantity} — ${formatNaira(
                            item.price *
                            item.quantity
                        )}\n`;

                }
            );


            const fulfilmentText =
                order.fulfilment ===
                "delivery"

                    ? "Delivery"

                    : "Pickup";


            const message =

                `Hello HANI'S CAKES EVENTS 'N' MORE,

I have made payment for my order.

Order Number:
${order.orderNumber}

Customer Name:
${order.customer.name}

Phone:
${order.customer.phone}

Order:
${itemsText}

Fulfilment:
${fulfilmentText}

Subtotal:
${formatNaira(
    order.subtotal
)}

Delivery Fee:
${formatNaira(
    order.deliveryFee
)}

Total Paid:
${formatNaira(
    order.total
)}

I have attached my payment screenshot for confirmation.

Thank you.`;


            const whatsappURL =
                `https://wa.me/2348147024101?text=${encodeURIComponent(
                    message
                )}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );


    /* =====================================================
       BACK TO CHECKOUT
    ===================================================== */

    const backButton =
        document.getElementById(
            "backToCheckoutBtn"
        );


    backButton?.addEventListener(
        "click",
        () => {

            paymentScreen.style.display =
                "none";


            if (checkoutForm) {

                checkoutForm.style.display =
                    "";

            }

        }
    );

}


/* =========================================================
   INITIALISE
========================================================= */

renderCart();

updateCartBadge();


const initialDelivery =
    getFulfilment() ===
    "delivery";


if (
    addressField &&
    customerAddress
) {

    addressField.style.display =
        initialDelivery
            ? "grid"
            : "none";


    customerAddress.required =
        initialDelivery;

}


updateCheckoutTotals();


/* =========================================================
   HANI'S CAKES AI CHAT
========================================================= */


/* ================= ELEMENTS ================= */

const aiChatButton =
    document.getElementById(
        "aiChatButton"
    );


const aiChatBox =
    document.getElementById(
        "aiChatBox"
    );


const aiChatClose =
    document.getElementById(
        "aiChatClose"
    );


const aiChatInput =
    document.getElementById(
        "aiChatInput"
    );


const aiChatSend =
    document.getElementById(
        "aiChatSend"
    );


const aiChatMessages =
    document.getElementById(
        "aiChatMessages"
    );


const aiQuickActions =
    document.querySelectorAll(
        ".ai-quick-actions button"
    );


/* ================= OPEN CHAT ================= */

aiChatButton?.addEventListener(
    "click",
    () => {

        aiChatBox?.classList.add(
            "active"
        );


        aiChatBox?.setAttribute(
            "aria-hidden",
            "false"
        );


        aiChatInput?.focus();

    }
);


/* ================= CLOSE CHAT ================= */

aiChatClose?.addEventListener(
    "click",
    () => {

        aiChatBox?.classList.remove(
            "active"
        );


        aiChatBox?.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* ================= ADD MESSAGE ================= */

function addAIMessage(
    message,
    sender
) {

    if (!aiChatMessages) return;


    const messageElement =
        document.createElement(
            "div"
        );


    if (
        sender === "user"
    ) {

        messageElement.className =
            "user-message";

    } else {

        messageElement.className =
            "ai-message";

    }


    messageElement.textContent =
        message;


    aiChatMessages.appendChild(
        messageElement
    );


    aiChatMessages.scrollTop =
        aiChatMessages.scrollHeight;

}


/* =========================================================
   QUICK QUESTION ANSWERS
========================================================= */

function getQuickAnswer(
    question
) {

    let answer = "";


    if (
        question ===
        "how-to-order"
    ) {

        answer =
            "Ordering is easy! Browse our cakes, choose the cake you want, click Add to Cart, review your cart, continue to checkout, enter your details, choose delivery or pickup, and continue to payment.";

    }


    else if (
        question ===
        "payment"
    ) {

        answer =
            "Payment is by bank transfer. Your order total and the HANI'S CAKES Opay account details will appear during checkout. After you make the transfer, click the payment button to send your screenshot through WhatsApp. Never send your PIN, password or OTP.";

    }


    else if (
        question ===
        "delivery"
    ) {

        answer =
            "Yes! HANI'S CAKES EVENTS 'N' MORE offers delivery. The delivery fee is added during checkout when you select Delivery.";

    }


    else if (
        question ===
        "pickup"
    ) {

        answer =
            "You can choose Pickup instead of Delivery during checkout. Pickup does not include the delivery fee.";

    }


    else if (
        question ===
        "cakes"
    ) {

        answer =
            "You can browse the Cakes section to see the available cakes, pictures and prices. Add any cake you like to your cart to begin your order.";

    }


    return answer;

}


/* ================= QUICK BUTTON CLICK ================= */

aiQuickActions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const question =
                    button.dataset.question;


                const answer =
                    getQuickAnswer(
                        question
                    );


                addAIMessage(
                    button.textContent.trim(),
                    "user"
                );


                setTimeout(
                    () => {

                        addAIMessage(
                            answer,
                            "ai"
                        );

                    },
                    300
                );

            }
        );

    }
);


/* ================= TYPED MESSAGE ================= */

function sendAIMessage() {

    if (!aiChatInput) return;


    const message =
        aiChatInput.value.trim();


    if (!message) return;


    addAIMessage(
        message,
        "user"
    );


    aiChatInput.value =
        "";


    /*
        This is still a simple
        website-specific assistant.

        It is NOT connected to a real
        AI API yet.
    */

    setTimeout(
        () => {

            addAIMessage(

                "Thanks for contacting HANI'S CAKES EVENTS 'N' MORE! I'm here to help you with our cakes, prices, ordering, delivery, pickup and payment. Please use one of the quick options above for specific information.",

                "ai"

            );

        },
        600
    );

}


/* ================= SEND BUTTON ================= */

aiChatSend?.addEventListener(
    "click",
    sendAIMessage
);


/* ================= ENTER KEY ================= */

aiChatInput?.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            sendAIMessage();

        }

    }
);


/* =========================================================
   DYNAMIC ISLAND INTERNET STATUS
========================================================= */

const internetStatus =
    document.getElementById(
        "internetStatus"
    );


const internetStatusText =
    document.getElementById(
        "internetStatusText"
    );


let internetStatusTimer;


/* ================= SHOW STATUS ================= */

function showInternetStatus(
    type,
    message
) {

    if (
        !internetStatus ||
        !internetStatusText
    ) {

        return;

    }


    clearTimeout(
        internetStatusTimer
    );


    internetStatus.classList.remove(
        "offline",
        "online"
    );


    internetStatus.classList.add(
        type
    );


    internetStatusText.textContent =
        message;


    internetStatus.classList.add(
        "show"
    );


    internetStatusTimer =
        setTimeout(
            () => {

                internetStatus.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* ================= OFFLINE ================= */

window.addEventListener(
    "offline",
    () => {

        showInternetStatus(
            "offline",
            "🔴 You're offline"
        );

    }
);


/* ================= ONLINE ================= */

window.addEventListener(
    "online",
    () => {

        showInternetStatus(
            "online",
            "🟢 You're back online"
        );

    }
);