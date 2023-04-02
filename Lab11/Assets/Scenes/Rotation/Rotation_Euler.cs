    using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Euler : MonoBehaviour
{
    public float Speed = 1f;
    private Vector3 _rotation;
    private int _rotateX;
    private void Start()
    {
        _rotateX = 0;
        _rotation = transform.rotation.eulerAngles;
    }

    private void Update()
    {

        if (_rotateX < 200)
        {
            _rotation.x += transform.position.x == 0 ? 1 : transform.position.x * Speed * Time.deltaTime;
        }
        else
        {
            _rotation.z += transform.position.z == 0 ? 1 : transform.position.z * Speed * Time.deltaTime;
            
            if (_rotateX > 400)
            {
                _rotateX = 0;
            }
        }

        _rotateX++;
        transform.eulerAngles = _rotation;
    }
}

