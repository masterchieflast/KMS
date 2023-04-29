using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class EventTest : MonoBehaviour, IPointerClickHandler
{
    public int Force = 100;
    public void OnPointerClick(PointerEventData eventData)
    {
        var red = Random.Range(0f, 1.0f);
        var blue = Random.Range(0f, 1.0f);
        var green = Random.Range(0f, 1.0f);
        var color = new Color(red, blue, green);

        var target = eventData.pointerPressRaycast.worldPosition;
        var collide = Camera.main.transform.position;
        
        var distance = (target - collide).normalized;
        var collisionDirection = distance * Force;

        gameObject.GetComponent<Renderer>().material.color = color;
        gameObject.GetComponent<Rigidbody>().AddForceAtPosition(collisionDirection, target);
    }
}
