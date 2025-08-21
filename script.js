  // Sample product data
        const products = [
            {
                id: 1,
                name: "Vase en céramique bleu",
                price: 60.00,
                category: "ceramique",
                description: "Magnifique vase en céramique émaillée à la main, d'un bleu profond inspiré par la Méditerranée. Parfait pour ajouter une touche d'élégance à votre intérieur.",
                stock: 8,
                images: [
                    "img/Vase en céramique bleu.jpg",
                    "img/Vase en céramique bleu.jpg",
                    "img/Vase en céramique bleu.jpg"
                ],
                features: [
                    "Hauteur: 25 cm",
                    "Diamètre: 12 cm",
                    "Céramique émaillée à la main",
                    "Fabriqué en France",
                    "Lavable au lave-vaisselle"
                ]
            },
            {
                id: 2,
                name: "Écharpe en laine naturelle",
                price: 25.50,
                category: "textile",
                description: "Écharpe tissée main en laine naturelle, douce et chaude. Disponible en plusieurs coloris naturels. Un accessoire indispensable pour l'hiver.",
                stock: 12,
                images: [
                    "img/Écharpe en laine.jpg",
                    "img/Écharpe en laine.jpg",
                    "img/Écharpe en laine.jpg"
                ],
                features: [
                    "100% laine naturelle",
                    "Longueur: 180 cm",
                    "Largeur: 30 cm",
                    "Lavable à la main",
                    "Teinture végétale"
                ]
            },
            {
                id: 3,
                name: "Plateau en bois d'olivier",
                price: 19.99,
                category: "bois",
                description: "Plateau fabriqué à partir de bois d'olivier français, avec des veines naturelles uniques. Idéal pour servir le petit déjeuner ou l'apéritif.",
                stock: 5,
                images: [
                   "img/Plateau en bois d'olivier.jpg",
                    "img/Plateau en bois d'olivier.jpg",
                    "img/Plateau en bois d'olivier.jpg"
                ],
                features: [
                    "Dimensions: 35 x 25 cm",
                    "Bois d'olivier massif",
                    "Finition à l'huile naturelle",
                    "Chaque pièce est unique",
                    "Fabriqué en Provence"
                ]
            },
            {
                id: 4,
                name: "Tasses en céramique",
                price: 8.00,
                category: "ceramique",
                description: "Tasses en céramique.",
                stock: 15,
                images: [
                    "img/tea-3658709_1280.jpg",
                    "img/tea-3658709_1280.jpg",
                    "img/tea-3658709_1280.jpg"
                ],
                features: [
                    "Contenance: 25 cl",
                    "Céramique émaillée",
                    "Lavable au lave-vaisselle",
                    "Micro-ondable",
                    "Emballage recyclable"
                ]
            },
            {
                id: 5,
                name: "Chaise en bois",
                price: 49.00,
                category: "bois",
                description: "Chaise en bois avec du tissu en cuir noir. Apporte confort et style à votre salon.",
                stock: 3,
                images: [
                    "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                ],
                features: [
                    "Diamètre: 45 cm",
                    "Hauteur: 35 cm",
                    "Tissu 100% coton",
                    "Rembourrage en mousse recyclée",
                    "Housse amovible et lavable"
                ]
            },
            {
                id: 6,
                name: "Couteau à fromage en bois",
                price: 24.00,
                category: "bois",
                description: "Couteau à fromage avec manche en bois de hêtre et lame en acier inoxydable. Un ustensile élégant pour votre table.",
                stock: 10,
                images: [
                    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                ],
                features: [
                    "Longueur totale: 22 cm",
                    "Lame en acier inoxydable 18/10",
                    "Manche en bois de hêtre",
                    "Fabriqué en France",
                    "Lavable à la main"
                ]
            }
        ];

        // Cart functionality
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Helpers for cart safety
        function getProductById(productId) {
            return products.find(p => p.id === productId);
        }

        function parsePositiveInt(value, fallback = 1) {
            const parsed = parseInt(value, 10);
            return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
        }

        function clampQuantity(quantity, maxStock) {
            const minClamped = Math.max(1, parsePositiveInt(quantity, 1));
            if (Number.isFinite(maxStock) && maxStock > 0) {
                return Math.min(minClamped, maxStock);
            }
            return minClamped;
        }

        function reconcileCartWithStock() {
            let mutated = false;
            cart = cart.filter(item => {
                const product = getProductById(item.id);
                if (!product) {
                    mutated = true;
                    return false;
                }
                const clamped = clampQuantity(item.quantity, product.stock);
                if (clamped !== item.quantity) {
                    item.quantity = clamped;
                    mutated = true;
                }
                return true;
            });
            if (mutated) {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }

        // Reconcile immediately on load
        reconcileCartWithStock();
        
        // Utilities
        const currencyFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
        const formatPrice = (value) => currencyFormatter.format(value);
        function addDelegatedEventListener(root, eventName, selector, handler) {
            if (!root) return;
            root.addEventListener(eventName, (event) => {
                const potentialTarget = event.target.closest(selector);
                if (potentialTarget && root.contains(potentialTarget)) {
                    handler(event, potentialTarget);
                }
            });
        }
        
        // DOM elements
        const productsContainer = document.getElementById('products-container');
        const productModal = document.getElementById('product-modal');
        const modalProductName = document.getElementById('modal-product-name');
        const modalProductDescription = document.getElementById('modal-product-description');
        const modalProductPrice = document.getElementById('modal-product-price');
        const modalProductStock = document.getElementById('modal-product-stock');
        const modalMainImage = document.getElementById('modal-main-image');
        const modalProductFeatures = document.getElementById('modal-product-features');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const productQty = document.getElementById('product-qty');
        const increaseQty = document.getElementById('increase-qty');
        const decreaseQty = document.getElementById('decrease-qty');
        const closeModal = document.getElementById('close-modal');
        const cartCount = document.getElementById('cart-count');
        const cartSection = document.getElementById('cart');
        const cartEmpty = document.getElementById('cart-empty');
        const cartContent = document.getElementById('cart-content');
        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('checkout-btn');
        const clearCartBtn = document.getElementById('clear-cart-btn');
        const filterButtons = document.querySelectorAll('.filter-btn');
        // Contact form elements
        const contactForm = document.getElementById('contact-form');
        const contactSuccess = document.getElementById('contact-success');
        // Nav links
        const desktopNavLinks = document.querySelectorAll('nav .md\\:flex a[href^="#"]');
        const mobileNavLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');

        function setActiveNav(hash) {
            // Desktop active state
            desktopNavLinks.forEach(link => {
                link.classList.remove('text-blue-500', 'border-b-4', 'border-blue-500');
                link.classList.add('text-gray-500');
            });
            const activeDesktop = Array.from(desktopNavLinks).find(l => l.getAttribute('href') === hash);
            if (activeDesktop) {
                activeDesktop.classList.remove('text-gray-500');
                activeDesktop.classList.add('text-blue-500', 'border-b-4', 'border-blue-500');
            }

            // Mobile active state
            mobileNavLinks.forEach(link => {
                link.classList.remove('bg-blue-500', 'text-white');
            });
            const activeMobile = Array.from(mobileNavLinks).find(l => l.getAttribute('href') === hash);
            if (activeMobile) {
                activeMobile.classList.add('bg-blue-500', 'text-white');
            }
        }
        
        // Current product in modal
        let currentProduct = null;

        // Mobile menu toggle
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        const allSections = () => Array.from(document.querySelectorAll('section'));
        const showCart = () => {
            cartSection.classList.remove('hidden');
            allSections().forEach(section => { if (section.id !== 'cart') section.classList.add('hidden'); });
            updateCart();
            window.scrollTo(0, 0);
            setActiveNav('#cart');
        };
        const showSection = (hash) => {
            const section = document.querySelector(hash);
            if (!section) return;
            allSections().forEach(s => s.classList.remove('hidden'));
            cartSection.classList.add('hidden');
            window.scrollTo(0, section.offsetTop);
            setActiveNav(hash);
        };

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Display products
        function displayProducts(filter = 'all') {
            productsContainer.innerHTML = '';
            
            const filteredProducts = filter === 'all' 
                ? products 
                : products.filter(product => product.category === filter);
            
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 fade-in';
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image w-full">
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-1">${product.name}</h3>
                        <p class="text-blue-500 font-bold mb-3">${formatPrice(product.price)}</p>
                        <div class="flex justify-between">
                            <button class="view-details-btn bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition" data-id="${product.id}">
                                Détails
                            </button>
                            <button class="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" data-id="${product.id}">
                                <i class="fas fa-cart-plus mr-1"></i> Ajouter
                            </button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
            // Events délégués gérés globalement
        }

        // Open product modal
        function openProductModal(productId) {
            currentProduct = products.find(p => p.id === productId);
            
            if (!currentProduct) return;
            
            modalProductName.textContent = currentProduct.name;
            modalProductDescription.textContent = currentProduct.description;
            modalProductPrice.textContent = formatPrice(currentProduct.price);
            modalProductStock.textContent = currentProduct.stock > 0 
                ? `${currentProduct.stock} disponible(s)` 
                : 'Rupture de stock';
            modalProductStock.classList.remove('text-green-600', 'text-red-600');
            if (currentProduct.stock > 0) {
                modalProductStock.classList.add('text-green-600');
            } else {
                modalProductStock.classList.add('text-red-600');
            }
            
            // Set main image
            modalMainImage.src = currentProduct.images[0];
            
            // Clear thumbnails
            const thumbnailsContainer = document.getElementById('thumbnails-container');
            thumbnailsContainer.innerHTML = '';
            
            // Add thumbnails
            currentProduct.images.forEach((img, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = img;
                thumbnail.alt = `${currentProduct.name} - vue ${index + 1}`;
                thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.addEventListener('click', () => {
                    modalMainImage.src = img;
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
                thumbnailsContainer.appendChild(thumbnail);
            });
            
            // Clear features
            modalProductFeatures.innerHTML = '';
            
            // Add features
            currentProduct.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalProductFeatures.appendChild(li);
            });
            
            // Reset quantity
            productQty.value = 1;
            
            // Show modal
            productModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        // Close product modal
        function closeProductModal() {
            productModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Quantity controls
        increaseQty.addEventListener('click', () => {
            productQty.value = parseInt(productQty.value) + 1;
        });

        decreaseQty.addEventListener('click', () => {
            if (parseInt(productQty.value) > 1) {
                productQty.value = parseInt(productQty.value) - 1;
            }
        });

        // Add to cart from modal
        addToCartBtn.addEventListener('click', () => {
            if (currentProduct) {
                const quantity = parseInt(productQty.value);
                addToCart(currentProduct.id, quantity);
                closeProductModal();
            }
        });

        // Close modal when clicking X or outside
        closeModal.addEventListener('click', closeProductModal);
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });

        // Add to cart function
        function addToCart(productId, quantity) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const requestedQty = parsePositiveInt(quantity, 1);
            if (product.stock <= 0) {
                showToast('Produit en rupture de stock');
                return;
            }

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                const desired = existingItem.quantity + requestedQty;
                const clamped = clampQuantity(desired, product.stock);
                if (clamped === existingItem.quantity) {
                    showToast('Stock insuffisant pour ajouter davantage');
                } else {
                    existingItem.quantity = clamped;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    const added = clamped - (desired - requestedQty);
                    showToast(`Quantité mise à jour: ${existingItem.quantity}`);
                }
                return;
            }

            const initialQty = clampQuantity(requestedQty, product.stock);
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: initialQty,
                image: product.images[0]
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            if (initialQty < requestedQty) {
                showToast(`Quantité ajustée au stock: ${initialQty}`);
            } else {
                showToast(`${initialQty} ${product.name} ajouté(s) au panier`);
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            const item = cart.find(i => i.id === productId);
            const label = item ? `"${item.name}"` : 'cet article';
            const ok = confirm(`Supprimer ${label} du panier ?`);
            if (!ok) return;
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            showToast('Produit retiré du panier');
        }

        function clearCart() {
            if (cart.length === 0) return;
            const ok = confirm('Voulez-vous vider tout le panier ?');
            if (!ok) return;
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            showToast('Panier vidé');
        }

        // Update cart quantity
        function updateCartItem(productId, newQuantity) {
            const item = cart.find(item => item.id === productId);
            if (!item) return;
            const product = getProductById(productId);
            if (!product) {
                removeFromCart(productId);
                return;
            }
            const clamped = clampQuantity(newQuantity, product.stock);
            item.quantity = clamped;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        // Update cart count in navbar
        function updateCartCount() {
            let count = 0;
            cart.forEach(item => {
                const product = getProductById(item.id);
                if (!product) return;
                const q = clampQuantity(item.quantity, product.stock);
                count += q;
            });
            cartCount.textContent = count;
        }

        // Update cart display
        function updateCart() {
            updateCartCount();
            
            if (cart.length === 0) {
                cartEmpty.classList.remove('hidden');
                cartContent.classList.add('hidden');
                return;
            }
            
            cartEmpty.classList.add('hidden');
            cartContent.classList.remove('hidden');
            
            // Clear cart items
            cartItems.innerHTML = '';
            
            let subtotal = 0;
            
            // Add cart items
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) return;
                // Clamp quantity to stock for display and totals
                const clampedQty = clampQuantity(item.quantity, product.stock);
                if (clampedQty !== item.quantity) {
                    item.quantity = clampedQty;
                }
                const total = item.price * clampedQty;
                subtotal += total;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'grid grid-cols-12 p-4 items-center border-b cart-item';
                cartItem.innerHTML = `
                    <div class="col-span-6 flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                        <span>${item.name}</span>
                    </div>
                    <div class="col-span-2 text-center">${formatPrice(item.price)}</div>
                    <div class="col-span-2 flex justify-center">
                        <input type="number" min="1" max="${product.stock}" value="${clampedQty}" class="w-16 text-center border rounded py-1 quantity-input" data-id="${item.id}">
                    </div>
                    <div class="col-span-2 flex justify-center items-center">
                        <span class="mr-4">${formatPrice(total)}</span>
                        <button class="text-red-500 hover:text-red-700 remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            // Persist any clamped quantity changes
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update totals
            cartSubtotal.textContent = formatPrice(subtotal);
            cartTotal.textContent = formatPrice(subtotal);
            
            // Listeners de panier gérés par délégation globale
        }

        // Show toast notification
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded shadow-lg flex items-center fade-in';
            toast.innerHTML = `
                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                <span>${message}</span>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Checkout button
        checkoutBtn.addEventListener('click', () => {
            showToast('Fonctionnalité de commande à venir. Contactez-nous pour finaliser votre achat.');
            setTimeout(() => {
                window.location.href = '#contact';
            }, 1000);
        });

        // Clear cart button
        clearCartBtn.addEventListener('click', clearCart);

        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                if (!name || !email || !subject || !message) {
                    showToast('Veuillez remplir tous les champs requis.');
                    return;
                }
                // Simulate successful submission
                contactForm.reset();
                if (contactSuccess) {
                    contactSuccess.classList.remove('hidden');
                    contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        contactSuccess.classList.add('hidden');
                    }, 4000);
                } else {
                    showToast('Votre demande a bien été envoyée.');
                }
            });
        }

        // Délégation: boutons Détails et Ajouter
        addDelegatedEventListener(document, 'click', '.view-details-btn', (e, btn) => {
            const productId = parseInt(btn.getAttribute('data-id'), 10);
            if (Number.isFinite(productId)) openProductModal(productId);
        });
        addDelegatedEventListener(document, 'click', '.add-to-cart-btn', (e, btn) => {
            const productId = parseInt(btn.getAttribute('data-id'), 10);
            if (Number.isFinite(productId)) addToCart(productId, 1);
        });

        // Délégation: suppression et changement de quantité dans le panier
        addDelegatedEventListener(document, 'click', '.remove-btn', (e, btn) => {
            const productId = parseInt(btn.getAttribute('data-id'), 10);
            if (Number.isFinite(productId)) removeFromCart(productId);
        });
        addDelegatedEventListener(document, 'input', '.quantity-input', (e, input) => {
            const productId = parseInt(input.getAttribute('data-id'), 10);
            const product = getProductById(productId);
            if (!product) return;
            const clamped = clampQuantity(input.value, product.stock);
            if (String(clamped) !== String(input.value)) input.value = clamped;
        });
        addDelegatedEventListener(document, 'change', '.quantity-input', (e, input) => {
            const productId = parseInt(input.getAttribute('data-id'), 10);
            const newQuantity = parseInt(input.value, 10);
            updateCartItem(productId, newQuantity);
        });

        // Délégation pour les filtres
        addDelegatedEventListener(document, 'click', '.filter-btn', (_, button) => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });
            button.classList.remove('bg-gray-200', 'text-gray-800');
            button.classList.add('bg-blue-500', 'text-white');
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });

        // Délégation pour la navigation
        addDelegatedEventListener(document, 'click', 'a[href^="#"]', (e, link) => {
            const hash = link.getAttribute('href');
            if (!hash) return;
            if (hash === '#cart') {
                e.preventDefault();
                showCart();
                return;
            }
            if (document.querySelector(hash)) {
                e.preventDefault();
                showSection(hash);
            }
        });

        // Navigation to legal handled by dedicated page

        // Initialize
        displayProducts();
        updateCartCount();
        setActiveNav(location.hash || '#catalogue');

        // Fermer le menu mobile via délégation
        addDelegatedEventListener(document, 'click', '.mobile-menu a', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });