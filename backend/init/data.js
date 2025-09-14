const data = [
    {
        service_name: 'catering',
        category: 7,
        service_description: 'rich and creamy paneer cubes cooked in buttery tomato gravy, perfectly spiced to melt in your mouth. a wedding favorite served hot with naan or roti',
        service_image: '1751520756463-Ndx4zfdDtSr71D78A97aGD34oPoKgJe1-06ec655440ba6272f7de186bb991e89e.jpg',
        service_price: 500,
        
    
    },
    {
        service_name: 'catering',
        category: 8,
        service_description: 'serve elegance with a selection of premium red and white wines. perfect for evening receptions and cocktail parties. includes wine glasses and a trained server for a classy experience',
        service_image: '1751520968852-oJsTnuIsTL4IlSNXolMDD4YlpGOLDLjt-c50975fd776cfae7afec8a7cf4a7d63f (2).jpg',
        service_price: 1299,
    
    },
    {
        
        service_name: 'catering',
        category: 9,
        service_description: 'cool and refreshing fresh fruit juice served chilled. choose from orange, mango, or pineapple – a healthy and tasty start to your wedding feast',
        service_image: '1751521121768-S4SN9ycBDpvHX99WN5O1M38LSl2eVbqV-02586a18643329c8f0a1c089c522b866.jpg',
        service_price: 149
    },
    {
      
        service_name: 'golden glow decor',
        category: 10,
        service_description: 'transform your venue into a dream wedding location with our exquisite decoration services. from elegant floral arrangements to dazzling lighting and thematic setups, we craft every detail to reflect your unique love story and style',
        service_image: '1751618261347-JOyrUB6OVaRJuFXqGI4Nnp8kQPCUpNQw-6d2d626e11dd33d8b2acb28e76d53d77.jpg',
        service_price: 12000,
     
    },
    {
       
        service_name: 'haldi decoration',
        category: 10,
        service_description: 'make your haldi ceremony special with our beautiful decoration service',
        service_image: '1751622397184-weMxafdcizL4HdCUTJi9BpZLXc1d2q3f-e0a8b108b8ce896a64d9d3b99919d959.jpg',
        service_price: 5000,
        
    },
    {
        
        service_name: 'haldi decoration',
        category: 10,
        service_description: 'make your haldi ceremony special with our beautiful decoration service',
        service_image: '1751622432756-gEYZEQnKlYmqP5LCHr5xz62LKQar00VV-427ec5c9a000ea053a7ae890feb52b31.jpg',
        service_price: 5000,
       
    },
    {
        service_name: 'mehendi',
        category: 11,
        service_description: 'green and floral decor, dhol props, bride seating, and beautiful lighting for mehendi night',
        service_image: '1751622669939-hDTBtvk4PQLhNtOzSGC9HawdFQ23ctpT-a9aaa457b9b9d9a360e748c3232b8847.jpg',
        service_price: 3000,
        
    },
    {
        
        service_name: 'mehendi',
        category: 11,
        service_description: 'green and floral decor, dhol props, bride seating, and beautiful lighting for mehendi night',
        service_image: '1751622681320-GxpHYOYozRMlDZckCZMRc08b4tPXotJW-2e4c51d3c4a7b7042bf538e05dd2b70f.jpg',
        service_price: 3000,
       
    },
    {
       
        service_name: 'mehendi',
        category: 11,
        service_description: 'green and floral decor, dhol props, bride seating, and beautiful lighting for mehendi night',
        service_image: '1751622695898-glkoP5XewR6eCKjaV6Wyaibu1cPe5aeC-a0c45aecd971095ef05a10091b9b012e.jpg',
        service_price: 3000,
        
    },
    {
       
        service_name: 'mehendi',
        category: 11,
        service_description: 'green and floral decor, dhol props, bride seating, and beautiful lighting for mehendi night',
        service_image: '1751622714132-aSsQaP1h02benI9SWTZ9Q268bpiKLEhx-e13fe6ee643d59cb9b633448acc9c72d.jpg',
        service_price: 2500,
        
    },
    {
       
        service_name: 'bride sitting',
        category: 11,
        service_description: 'make the bride feel special with a stunning sitting arrangement',
        service_image: '1751623133942-yOVjdatzfWptwj3LdREFjo0XQmpI7E2t-9823698970924d656fe9d0796f4c9a54.jpg',
        service_price: 12000,
       
    },
    {
        service_name: 'bride sitting',
        category: 11,
        service_description: 'make the bride feel special with a stunning sitting arrangement',
        service_image: '1751623162941-2GKdD6pFawvMqxnvH0eJUonu7XbDs29z-25ee2cb7e0e35becab269c074ddcee17.jpg',
        service_price: 9000,
    },
    {
       
        service_name: 'bride sitting',
        category: 11,
        service_description: 'make the bride feel special with a stunning sitting arrangement',
        service_image: '1751623180474-QAfwj3mMDElM40h7fideed0BBWbQdSK0-fe835d50015face9ad561417b67e8b03.jpg',
        service_price: 5000,

    },
    {
        
        service_name: 'entry decor',
        category: 11,
        service_description: 'fresh marigold and rose garlands hang elegantly at the entrance.',
        service_image: '1751623424902-IVTMCo9EIXlsHALfavgt1AnibC1VtarN-321314ebd20c7dc267359e45a4bfce78.jpg',
        service_price: 8000,

    },
    {
       
        service_name: 'entry decor',
        category: 11,
        service_description: 'fresh marigold and rose garlands hang elegantly at the entrance.',
        service_image: '1751623444345-hpZ3vgsJI0aGDZlvCJRXqM5K8ldJ1U6x-42fc4b8ffb47d732b44f6126e5ee05a1.jpg',
        service_price: 11000,
    
    },
    {
        
        service_name: 'stage decoration',
        category: 12,
        service_description: 'we offer both traditional and modern stage design themes',
        service_image: '1751623681812-fJOhQQ0gZWXTT9IPX0o6j2QChmA0bXeb-6eb111f97a89f079b852ae40b3ea2bc7.jpg',
        service_price: 21000,
    },
    {
        service_name: 'guest sitting arrangement',
        category: 12,
        service_description: 'choose from chairs, sofas, floor seating, or cushions based on theme.',
        service_image: '1751624194422-BfpyUANFeWKMQT14HnSpX4lz7w4YtNTG-7cfcd217dc54283919a5bd2d7fd3ea53.jpg',
        service_price: 25000,
    
    },
    {
       
        service_name: 'guest sitting arrangement',
        category: 12,
        service_description: 'choose from chairs, sofas, floor seating, or cushions based on theme.',
        service_image: '1751624229991-5zQU607pzYq0rdf1c8DblJok0ZunUaYU-108f95a143cff51e9120217c46dbb9cf.jpg',
        service_price: 21000,
   
    },
    {
      
        service_name: 'palki for bride entry',
        category: 12,
        service_description: "beautifully decorated palki/doli for bride's traditional entry.",
        service_image: '1751624423943-Y6u6vvYcWL0odlokNuclvFSbTF50mFll-0481e4fb6541722b88807a9b4d5400ac.jpg',
        service_price: 2400,
   
    },
    {
    
        service_name: 'palki for bride entry',
        category: 12,
        service_description: "beautifully decorated palki/doli for bride's traditional entry.",
        service_image: '1751624452144-7eWY5vAi2ovftVdvuOVXjYLfn9Kb08je-cb9af02abe4af55e996f34b6a4e8beb3.jpg',
        service_price: 1800,
      
    }
];
export default data;