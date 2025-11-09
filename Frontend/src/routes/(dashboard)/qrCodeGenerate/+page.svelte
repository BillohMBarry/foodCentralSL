<script>
    import {QRCode} from '@castlenine/svelte-qrcode';
</script>
<main class="main-content">
<h1>Generate QR Code for menu's</h1>
<section class="page-wrapper">

    <QRCode data="Hello World" size={500} />
</section>
</main>