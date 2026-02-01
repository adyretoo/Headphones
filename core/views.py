from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_products(request):
    slides = [
      {
        "id": 1,
        "model": "Studio 3",
        "price": "$349",
        "src": "/Info-Hero.png", 
        "views": [
          { "id": 'v1', "name": 'Main', "src": '/CaruselHead-rightVIew.png' },
          { "id": 'v2', "name": 'Side', "src": '/CaruselCard.png' },
          { "id": 'v3', "name": 'Box', "src": '/CaruselHead-down.png' },
          { "id": 'v4', "name": 'Case', "src": '/CaruselBag.png' },
        ]
      },
      {
        "id": 2,
        "model": "Solo Pro Red",
        "price": "$299",
        "src": "/carusel.png", 
        "views": [
          { "id": 'v1', "name": 'Main', "src": '/CaruselHead-rightVIewRed.png' },
          { "id": 'v2', "name": 'Side', "src": '/CaruselCard-Red.png' },
          { "id": 'v3', "name": 'Case', "src": '/CaruselHead-downRed.png' },
          { "id": 'v4', "name": 'Box', "src": '/CaruselBag-Red.png' }
        ]
      },
      {
        "id": 3,
        "model": "Solo Pro Stich",
        "price": "$299",
        "src": "/carusel1.png",
        "views": [
          { "id": 'v1', "name": 'Main', "src": '/carusel1.png' },
          { "id": 'v2', "name": 'Side', "src": '/CaruselCard-Blue.png' },
          { "id": 'v3', "name": 'Box', "src": '/CaruselBag.png' },
        ]
      },
      {
        "id": 4,
        "model": "Solo Pro 02",
        "price": "$299",
        "src": "/carusel3.png",
        "views": [
          { "id": 'v1', "name": 'Main', "src": '/carusel3.png' },
          { "id": 'v2', "name": 'Side', "src": '/CaruselCard-White.png' },
          { "id": 'v3', "name": 'Box', "src": '/CaruselBag.png' }
        ]
      },
      {
        "id": 5,
        "model": "Solo Pro Pink",
        "price": "$299",
        "src": "/carusel4.png",
        "views": [
          { "id": 'v1', "name": 'Main', "src": '/CaruselHead-rightVIewPink.png' },
          { "id": 'v2', "name": 'Side', "src": '/CaruselCard-Pink.png' },
          { "id": 'v3', "name": 'Case', "src": '/CaruselHead-downPimk.png' },
          { "id": 'v4', "name": 'Box', "src": '/CaruselBag-Pink.png' },
        ]
      }
    ]
    return Response(slides)