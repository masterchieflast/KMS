using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScriptScale : MonoBehaviour
{
    void Start()
    {

    }

    void Update()
    {
        var scale = transform.localScale;
        var scaleX = scale.x + Time.deltaTime;
        var scaleZ = scale.z + Time.deltaTime;
        transform.localScale = new Vector3(scaleX, scale.y, scaleZ);
    }
}
