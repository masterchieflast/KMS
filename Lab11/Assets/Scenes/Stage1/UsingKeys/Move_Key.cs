using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move_Key : MonoBehaviour
{
    public float Speed = 5f;

    void Start()
    {
        
    }

    void Update()
    {
        float x = 0f, y = 0f, z = 0f;

        if (Input.GetKey(KeyCode.W))
        {
            y += Speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.S))
        {
            y -= Speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.A))
        {
            x -= Speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.D))
        {
            x += Speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.Q))
        {
            z -= Speed * Time.deltaTime;
        }
        if (Input.GetKey(KeyCode.E))
        {
            z += Speed * Time.deltaTime;
        }

        transform.position += new Vector3(x, y, z);
    }
}
