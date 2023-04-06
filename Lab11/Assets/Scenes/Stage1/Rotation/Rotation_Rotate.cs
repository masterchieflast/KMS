using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Rotate : MonoBehaviour
{
    public float Speed = 1f;

    void Start()
    {
        
    }

    void Update()
    {
        transform.Rotate(Vector3.up, Speed * Time.deltaTime);
    }
}
