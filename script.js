// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Mobil menüyü kapat
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('İletişim formu verileri:', formValues);
        
        // Show success message
        alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.');
        this.reset();
    });
}

// Vehicle card hover effect
const vehicleCards = document.querySelectorAll('.vehicle-card');
vehicleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.vehicle-card, .service-card, .contact-info');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.vehicle-card, .service-card, .contact-info');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!document.querySelector('.hamburger')) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        nav.insertBefore(hamburger, navLinks);
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
};

// Initialize mobile menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    } else {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.remove();
        }
        document.querySelector('.nav-links')?.classList.remove('active');
    }
});

// Form sekmeleri için değişkenler
const tabs = document.querySelectorAll('.tab');
const formContent = document.querySelector('.form-content');

// Sekme değiştirme işlevi
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Aktif sekmeyi değiştir
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Model yılı seçeneklerini doldur
const yearSelect = document.querySelector('#arac-form select:first-child');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= currentYear - 20; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

// Örnek marka listesi
const carBrands = [
    'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Ford', 'Toyota', 
    'Honda', 'Hyundai', 'Kia', 'Renault', 'Fiat', 'Peugeot'
];

// Marka seçeneklerini doldur
const brandSelect = document.querySelector('#arac-form select:nth-child(2)');
carBrands.sort().forEach(brand => {
    const option = document.createElement('option');
    option.value = brand.toLowerCase();
    option.textContent = brand;
    brandSelect.appendChild(option);
});

// Marka seçimine göre model seçeneklerini güncelle
const carModels = {
    mercedes: ['A180', 'C200', 'E250', 'GLA200', 'CLA200'],
    bmw: ['116i', '320i', '520d', 'X1', 'X3'],
    audi: ['A3', 'A4', 'A6', 'Q3', 'Q5'],
    volkswagen: ['Golf', 'Passat', 'Tiguan', 'T-Roc', 'Polo'],
    // Diğer markalar için modeller eklenebilir
};

// Model seçeneklerini güncelleme işlevi
const modelSelect = document.querySelector('#arac-form select:last-child');
brandSelect.addEventListener('change', (e) => {
    const selectedBrand = e.target.value;
    modelSelect.innerHTML = '<option value="">Model Seçiniz</option>';
    
    if (carModels[selectedBrand]) {
        carModels[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase();
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

// Araç değerleme formu gönderimi
const carForm = document.querySelector('#arac-form');
carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form verilerini al
    const formData = new FormData(carForm);
    const formValues = Object.fromEntries(formData);
    
    // Normalde bu veriler sunucuya gönderilir
    console.log('Form verileri:', formValues);
    
    // Kullanıcıya bilgi ver
    alert('Araç değerleme talebiniz alındı. En kısa sürede size dönüş yapılacaktır.');
});

// Yedek parça kartları için hover efekti
const partCards = document.querySelectorAll('.part-card');
partCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 