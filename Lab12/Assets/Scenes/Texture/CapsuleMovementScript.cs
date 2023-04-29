using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CapsuleMovementScript : MonoBehaviour
{
    public float Speed = 5f; 
    public float Sensitivity = 2f;
    public Texture2D Texture1;
    public Texture2D Texture2;
    public GameObject Cube;

    private float _xRotation;
    
    
    void Update()
    {
        MoveCapsule();

        if (Input.GetKeyDown(KeyCode.T)) 
        {
            Cube.GetComponent<Renderer>().material.mainTexture =
                Random.Range(0, 2) == 0 ? Texture1 : Texture2; 
        }
    }

    private void MoveCapsule()
    {
        var horizontal = Input.GetAxis("Horizontal");
        var vertical = Input.GetAxis("Vertical");
        var movement = new Vector3(horizontal, 0f, vertical) * Speed * Time.deltaTime;
        transform.Translate(movement);

        var mouseX = Input.GetAxis("Mouse X") * Sensitivity;
        transform.Rotate(0f, mouseX, 0f);

        var mouseY = Input.GetAxis("Mouse Y") * Sensitivity;
        _xRotation -= mouseY;
        _xRotation = Mathf.Clamp(_xRotation, -90f, 90f);
        transform.localRotation = Quaternion.Euler(_xRotation, transform.localRotation.eulerAngles.y, 0f);
    }

    void OnCollisionEnter(Collision col)
    {
        if (col.gameObject.name == "Cube1" || col.gameObject.name == "Cube2")
        {
            //col.gameObject.GetComponent<Renderer>().material.color 
            //    = Random.ColorHSV(0f, 1f, 1f, 1f, 0.5f, 1f);
            col.gameObject.GetComponent<Renderer>().material.mainTexture 
                = Random.Range(0, 2) == 0 ? Texture1 : Texture2;
        }
    }
}
